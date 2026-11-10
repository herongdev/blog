import Cocoa
import WebKit

@MainActor
final class EditorApp: NSObject, NSApplicationDelegate, NSWindowDelegate, WKNavigationDelegate, WKUIDelegate {
    var window: NSWindow!
    var web: WKWebView!
    var server: Process?
    var root: URL!
    var support: URL!
    var scopedRoot: URL?
    var scopedAccessStarted = false
    var startupTimer: Timer?
    var attempts = 0
    var closeApproved = false
    var closeCheckPending = false

    func applicationDidFinishLaunching(_ notification: Notification) {
        guard let path = Bundle.main.object(forInfoDictionaryKey: "CourseProjectRoot") as? String else {
            fail("找不到工程路径。请从工程目录打开微课视频应用。")
            return
        }
        root = URL(fileURLWithPath: path, isDirectory: true)
        support = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("LocalCourseVideo", isDirectory: true)
        do { try FileManager.default.createDirectory(at: support, withIntermediateDirectories: true) }
        catch { fail("无法创建应用记录目录：\(error.localizedDescription)"); return }
        startupLog("launch pid=\(ProcessInfo.processInfo.processIdentifier) build=\(Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") ?? "unknown")")

        let menu = NSMenu()
        let appItem = NSMenuItem()
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "关于微课视频", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
        appMenu.addItem(NSMenuItem.separator())
        appMenu.addItem(withTitle: "退出微课视频", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        menu.addItem(appItem)
        let editItem = NSMenuItem()
        let editMenu = NSMenu(title: "编辑")
        editMenu.addItem(withTitle: "撤销", action: Selector(("undo:")), keyEquivalent: "z")
        editMenu.addItem(withTitle: "重做", action: Selector(("redo:")), keyEquivalent: "Z")
        editMenu.addItem(NSMenuItem.separator())
        editMenu.addItem(withTitle: "剪切", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        editMenu.addItem(withTitle: "拷贝", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        editMenu.addItem(withTitle: "粘贴", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        editMenu.addItem(withTitle: "全选", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editItem.submenu = editMenu
        menu.addItem(editItem)
        let videoItem = NSMenuItem(title: "视频", action: nil, keyEquivalent: "")
        let videoMenu = NSMenu(title: "视频")
        let generateItem = NSMenuItem(title: "生成视频", action: #selector(generateVideo(_:)), keyEquivalent: "r")
        generateItem.target = self
        generateItem.keyEquivalentModifierMask = [.command]
        videoMenu.addItem(generateItem)
        let renderItem = NSMenuItem(title: "仅更新画面", action: #selector(renderVideo(_:)), keyEquivalent: "r")
        renderItem.target = self
        renderItem.keyEquivalentModifierMask = [.command, .shift]
        videoMenu.addItem(renderItem)
        videoMenu.addItem(NSMenuItem.separator())
        let importItem = NSMenuItem(title: "导入新文本", action: #selector(importText(_:)), keyEquivalent: "n")
        importItem.target = self
        importItem.keyEquivalentModifierMask = [.command]
        videoMenu.addItem(importItem)
        let saveItem = NSMenuItem(title: "保存修改", action: #selector(saveChanges(_:)), keyEquivalent: "s")
        saveItem.target = self
        saveItem.keyEquivalentModifierMask = [.command]
        videoMenu.addItem(saveItem)
        videoItem.submenu = videoMenu
        menu.addItem(videoItem)
        NSApp.mainMenu = menu
        if let icon = Bundle.main.url(forResource: "hr-elephant", withExtension: "png") {
            NSApp.applicationIconImage = NSImage(contentsOf: icon)
        }

        let config = WKWebViewConfiguration()
        config.mediaTypesRequiringUserActionForPlayback = [.audio, .video]
        web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = self
        web.uiDelegate = self
        web.setValue(false, forKey: "drawsBackground")
        window = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1240, height: 820),
                          styleMask: [.titled, .closable, .miniaturizable, .resizable], backing: .buffered, defer: false)
        window.title = "微课视频"
        window.minSize = NSSize(width: 960, height: 640)
        window.contentView = web
        window.delegate = self
        window.center()
        window.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)

        // Request only this project's folder through the standard macOS picker.
        // No Documents-folder or Full Disk Access setting is changed by this app.
        guard grantProjectAccess(expected: root) else {
            closeApproved = true
            NSApp.terminate(nil)
            return
        }
        let python = root.appendingPathComponent(".venv/bin/python")
        guard FileManager.default.isExecutableFile(atPath: python.path) else {
            fail("已验证的运行环境不存在。请恢复工程原来的 .venv；应用不会重新安装依赖。")
            return
        }
        let runtime = support.appendingPathComponent("app-session.json")
        try? FileManager.default.removeItem(at: runtime)
        let logURL = support.appendingPathComponent("app-server.log")
        FileManager.default.createFile(atPath: logURL.path, contents: nil)
        let task = Process()
        task.executableURL = python
        task.arguments = [root.appendingPathComponent("app_server.py").path, "--write-session", runtime.path]
        task.currentDirectoryURL = root
        var env = ProcessInfo.processInfo.environment
        env["PATH"] = root.appendingPathComponent(".bin").path + ":/usr/bin:/bin:/usr/sbin:/sbin"
        env["PYTHONUNBUFFERED"] = "1"
        env.removeValue(forKey: "PYTHONHOME")
        env.removeValue(forKey: "PYTHONPATH")
        task.environment = env
        do {
            let log = try FileHandle(forWritingTo: logURL)
            task.standardOutput = log
            task.standardError = log
            try task.run()
            server = task
            startupLog("python started pid=\(task.processIdentifier)")
        } catch {
            fail("无法打开本机编辑器：\(error.localizedDescription)。\n日志：\(logURL.path)")
            return
        }
        startupTimer = Timer.scheduledTimer(withTimeInterval: 0.2, repeats: true) { [weak self] _ in
            Task { @MainActor in self?.checkStartup(runtime) }
        }
    }

    func sameProject(_ url: URL, _ expected: URL) -> Bool {
        url.standardizedFileURL.path == expected.standardizedFileURL.path
    }

    func grantProjectAccess(expected: URL) -> Bool {
        let bookmarkFile = support.appendingPathComponent("project-root.bookmark")
        if let data = try? Data(contentsOf: bookmarkFile) {
            do {
                var stale = false
                let resolved = try URL(resolvingBookmarkData: data,
                    options: [.withSecurityScope, .withoutUI, .withoutMounting],
                    relativeTo: nil, bookmarkDataIsStale: &stale)
                if sameProject(resolved, expected) {
                    let started = resolved.startAccessingSecurityScopedResource()
                    if started {
                        scopedRoot = resolved
                        scopedAccessStarted = true
                        root = resolved
                        if stale {
                            let renewed = try resolved.bookmarkData(options: .withSecurityScope,
                                includingResourceValuesForKeys: nil, relativeTo: nil)
                            try renewed.write(to: bookmarkFile, options: .atomic)
                        }
                        startupLog("project bookmark restored")
                        return true
                    }
                    startupLog("project bookmark scope unavailable; requesting project selection")
                }
            } catch { startupLog("project bookmark needs renewal: \(error.localizedDescription)") }
        }
        while true {
            let panel = NSOpenPanel()
            panel.title = "打开当前微课工程"
            panel.message = "请选择当前工程“\(expected.lastPathComponent)”，以编辑文稿、复用配音并保存视频。"
            panel.prompt = "打开工程"
            panel.directoryURL = expected
            panel.canChooseDirectories = true
            panel.canChooseFiles = false
            panel.canCreateDirectories = false
            panel.allowsMultipleSelection = false
            guard panel.runModal() == .OK, let selected = panel.url else {
                startupLog("project selection cancelled")
                return false
            }
            guard sameProject(selected, expected) else {
                let alert = NSAlert()
                alert.messageText = "请选择当前微课工程"
                alert.informativeText = "仅可打开这个工程目录：\n\(expected.path)"
                alert.addButton(withTitle: "重新选择")
                alert.runModal()
                continue
            }
            let started = selected.startAccessingSecurityScopedResource()
            do {
                let bookmark = try selected.bookmarkData(options: .withSecurityScope,
                    includingResourceValuesForKeys: nil, relativeTo: nil)
                try bookmark.write(to: bookmarkFile, options: .atomic)
                scopedRoot = selected
                scopedAccessStarted = started
                root = selected
                startupLog("project selected and scoped bookmark saved")
                return true
            } catch {
                if started { selected.stopAccessingSecurityScopedResource() }
                fail("无法保存当前工程的访问记录：\(error.localizedDescription)。请重新打开应用并选择工程目录。")
                return false
            }
        }
    }

    func startupLog(_ message: String) {
        guard let support else { return }
        let url = support.appendingPathComponent("native-startup.log")
        if !FileManager.default.fileExists(atPath: url.path) {
            FileManager.default.createFile(atPath: url.path, contents: nil)
        }
        if let file = try? FileHandle(forWritingTo: url) {
            defer { try? file.close() }
            _ = try? file.seekToEnd()
            try? file.write(contentsOf: Data((ISO8601DateFormatter().string(from: Date()) + " " + message + "\n").utf8))
        }
    }

    func checkStartup(_ runtime: URL) {
        attempts += 1
        if let data = try? Data(contentsOf: runtime),
           let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let address = object["url"] as? String, let url = URL(string: address) {
            startupTimer?.invalidate()
            startupLog("local editor ready")
            web.load(URLRequest(url: url))
        } else if attempts > 100 || server?.isRunning == false {
            startupTimer?.invalidate()
            let logURL = runtime.deletingLastPathComponent().appendingPathComponent("app-server.log")
            let detail = (try? String(contentsOf: logURL, encoding: .utf8)) ?? ""
            startupLog("local editor startup failed")
            fail("本机编辑器没有启动成功。\n\(detail.suffix(900))\n日志：\(logURL.path)")
        }
    }

    func fail(_ message: String) {
        startupLog("failure: \(message)")
        let alert = NSAlert()
        alert.messageText = "未能打开微课视频"
        alert.informativeText = message
        alert.addButton(withTitle: "知道了")
        alert.runModal()
        closeApproved = true
        NSApp.terminate(nil)
    }

    func requestClose(_ completion: @escaping (Bool) -> Void) {
        closeCheckPending = true
        web.evaluateJavaScript("Boolean(window.CourseEditor && window.CourseEditor.hasUnsavedChanges())") { [weak self] value, error in
            guard let self else { completion(true); return }
            let dirty = (value as? Bool) ?? (error != nil)
            if !dirty {
                self.closeCheckPending = false
                completion(true)
                return
            }
            let alert = NSAlert()
            alert.alertStyle = .warning
            alert.messageText = "还有尚未保存的修改"
            alert.informativeText = "退出后，这些修改将不会保存。"
            alert.addButton(withTitle: "继续编辑")
            alert.addButton(withTitle: "放弃修改并退出")
            alert.beginSheetModal(for: self.window) { response in
                self.closeCheckPending = false
                completion(response == .alertSecondButtonReturn)
            }
        }
    }

    @objc func generateVideo(_ sender: Any?) { invokeEditorButton("generate-button") }
    @objc func renderVideo(_ sender: Any?) { invokeEditorButton("render-button") }
    @objc func importText(_ sender: Any?) { invokeEditorButton("import-button") }
    @objc func saveChanges(_ sender: Any?) { invokeEditorButton("save-button") }

    func invokeEditorButton(_ identifier: String) {
        guard let web else { NSSound.beep(); return }
        // Reuse the same page handlers, including saving, conflict checks and busy state.
        // An open dialog must be completed or cancelled before a background action.
        let script = """
        (() => {
          const button = document.getElementById('\(identifier)');
          if (!button || button.disabled || document.querySelector('dialog[open]')) return false;
          button.click();
          return true;
        })()
        """
        web.evaluateJavaScript(script) { [weak self] value, error in
            if error != nil || (value as? Bool) != true { NSSound.beep() }
            else { self?.startupLog("native menu action \(identifier)") }
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        snapshotEditorWhenReady(attempt: 0)
    }

    func snapshotEditorWhenReady(attempt: Int) {
        let ready = """
        Boolean(window.CourseEditor && document.querySelector('#cue-list textarea') &&
          document.getElementById('preview-image') &&
          !document.getElementById('preview-image').hidden &&
          document.getElementById('preview-image').complete &&
          document.getElementById('preview-image').naturalWidth > 0 &&
          (!document.fonts || document.fonts.status === 'loaded'))
        """
        web.evaluateJavaScript(ready) { [weak self] value, error in
            guard let self else { return }
            if (value as? Bool) == true {
                self.snapshotEditorContent()
            } else if attempt < 80 {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self] in
                    self?.snapshotEditorWhenReady(attempt: attempt + 1)
                }
            } else {
                self.startupLog("documentation snapshot not saved: editor content was not ready")
            }
        }
    }

    func snapshotEditorContent() {
        let configuration = WKSnapshotConfiguration()
        configuration.rect = web.bounds
        configuration.snapshotWidth = NSNumber(value: Double(web.bounds.width))
        configuration.afterScreenUpdates = true
        // Only this app's own rendered web content; never capture another app or the desktop.
        web.takeSnapshot(with: configuration) { [weak self] image, error in
            guard let self else { return }
            guard let image, let tiff = image.tiffRepresentation,
                  let bitmap = NSBitmapImageRep(data: tiff),
                  let png = bitmap.representation(using: .png, properties: [:]) else {
                self.startupLog("documentation snapshot failed: \(error?.localizedDescription ?? "no image")")
                return
            }
            do {
                try png.write(to: self.support.appendingPathComponent("editor-window.png"), options: .atomic)
                self.startupLog("documentation snapshot saved: editor-window.png")
            } catch {
                self.startupLog("documentation snapshot write failed: \(error.localizedDescription)")
            }
        }
    }

    func windowShouldClose(_ sender: NSWindow) -> Bool {
        if closeApproved { return true }
        if closeCheckPending { return false }
        requestClose { [weak self] approved in
            guard let self, approved else { return }
            self.closeApproved = true
            self.window.performClose(nil)
        }
        return false
    }

    func applicationShouldTerminate(_ sender: NSApplication) -> NSApplication.TerminateReply {
        if closeApproved || web == nil { return .terminateNow }
        if closeCheckPending { return .terminateCancel }
        requestClose { [weak self] approved in
            self?.closeApproved = approved
            NSApp.reply(toApplicationShouldTerminate: approved)
        }
        return .terminateLater
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
    func applicationWillTerminate(_ notification: Notification) {
        startupTimer?.invalidate()
        if server?.isRunning == true { server?.terminate() }
        if scopedAccessStarted { scopedRoot?.stopAccessingSecurityScopedResource() }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else { decisionHandler(.cancel); return }
        decisionHandler(url.host == "127.0.0.1" || url.absoluteString == "about:blank" ? .allow : .cancel)
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = NSAlert(); alert.messageText = message; alert.addButton(withTitle: "知道了")
        alert.beginSheetModal(for: window) { _ in completionHandler() }
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let alert = NSAlert(); alert.messageText = message
        alert.addButton(withTitle: "继续"); alert.addButton(withTitle: "取消")
        alert.beginSheetModal(for: window) { result in completionHandler(result == .alertFirstButtonReturn) }
    }
}

MainActor.assumeIsolated {
    let app = NSApplication.shared
    app.setActivationPolicy(.regular)
    let delegate = EditorApp()
    app.delegate = delegate
    withExtendedLifetime(delegate) { app.run() }
}
