#!/usr/bin/env python3
"""Explicit Bilibili login, sharing the host SQLite executor lease."""
import argparse
import json
import os
from pathlib import Path
import re
import signal
import sqlite3
import subprocess
import sys
import tempfile
import time
import uuid

from runner import biliup_binary, now


class LoginLease:
    def __init__(self, root, account_id):
        path = root / 'publishing.sqlite'
        if not path.is_file(): raise RuntimeError('未找到宿主发布数据库，请先启动后台并创建账号')
        self.db = sqlite3.connect(f'file:{path}?mode=rw', uri=True, timeout=5, isolation_level=None)
        self.owner = 'local-login:' + uuid.uuid4().hex
        self.id = str(uuid.uuid4())
        self.account_id = account_id
    def acquire(self):
        self.db.execute('BEGIN IMMEDIATE')
        try:
            row = self.db.execute('SELECT payload FROM accounts WHERE id=?', (self.account_id,)).fetchone()
            account = json.loads(row[0]) if row else None
            if not account or account['platform'] != 'bilibili' or account.get('disconnected_at'):
                raise RuntimeError('账号不存在、已断开或不是 B站账号')
            lease = self.db.execute('SELECT expires FROM executor WHERE id=1').fetchone()
            if not lease or lease[0] > time.time()*1000:
                raise RuntimeError('发布执行槽正在使用，请等待后台任务结束后再登录')
            for table in ('targets', 'sessions'):
                if self.db.execute(f"SELECT 1 FROM {table} WHERE status IN ('running','waiting_user') OR (account_id=? AND status='queued') LIMIT 1", (self.account_id,)).fetchone():
                    raise RuntimeError('存在未结束的执行或本账号排队任务，请先在后台处理')
            self.db.execute('UPDATE executor SET owner=?,expires=? WHERE id=1', (self.owner, int(time.time()*1000)+30000))
            value = {'id': self.id, 'account_id': self.account_id, 'platform': 'bilibili', 'operation': 'login', 'status': 'running', 'stage': 'waiting_scan', 'owner': self.owner, 'created_at': now(), 'external_local': True, 'qr_version': 0, 'challenge': None}
            self.db.execute('INSERT INTO sessions VALUES(?,?,?,?,?)', (self.id,self.account_id,'running',value['created_at'],json.dumps(value)))
            self.db.execute('COMMIT')
        except BaseException:
            self.db.execute('ROLLBACK'); raise
    def heartbeat(self, pid=None, process_start=None):
        self.db.execute('BEGIN IMMEDIATE')
        try:
            changed = self.db.execute('UPDATE executor SET expires=? WHERE id=1 AND owner=? AND expires>?', (int(time.time()*1000)+30000,self.owner,int(time.time()*1000))).rowcount
            row = self.db.execute('SELECT payload FROM sessions WHERE id=?',(self.id,)).fetchone()
            value = json.loads(row[0]) if row else {}
            if not changed or value.get('cancel_requested') or value.get('status') not in ('running','waiting_user'):
                raise RuntimeError('登录已取消或执行租约失效')
            if pid:
                value.update(pid=pid,process_start=process_start)
                self.db.execute('UPDATE sessions SET payload=? WHERE id=?',(json.dumps(value),self.id))
            self.db.execute('COMMIT')
        except BaseException:
            self.db.execute('ROLLBACK'); raise
    def save(self, temporary, account):
        json.loads(temporary.read_text())
        self.db.execute('BEGIN IMMEDIATE')
        try:
            row = self.db.execute('SELECT owner,expires FROM executor WHERE id=1').fetchone()
            session = json.loads(self.db.execute('SELECT payload FROM sessions WHERE id=?',(self.id,)).fetchone()[0])
            if row[0] != self.owner or row[1] <= time.time()*1000 or session.get('cancel_requested'):
                raise RuntimeError('登录租约失效，会话未替换')
            replacement = account.with_name(account.name + '.' + uuid.uuid4().hex + '.tmp')
            replacement.write_bytes(temporary.read_bytes()); replacement.chmod(0o600)
            os.replace(replacement, account)
            identity = json.loads(self.db.execute('SELECT payload FROM accounts WHERE id=?',(self.account_id,)).fetchone()[0])
            identity.update(auth_status='unknown',checked_at=None,platform_uid=None,display_name=None)
            self.db.execute('UPDATE accounts SET payload=? WHERE id=?',(json.dumps(identity),self.account_id))
            self.db.execute('COMMIT')
        except BaseException:
            self.db.execute('ROLLBACK'); raise
    def finish(self, success):
        self.db.execute('BEGIN IMMEDIATE')
        try:
            row = self.db.execute('SELECT owner FROM executor WHERE id=1').fetchone()
            if row and row[0] == self.owner:
                session = json.loads(self.db.execute('SELECT payload FROM sessions WHERE id=?',(self.id,)).fetchone()[0])
                session.update(status='completed' if success else 'canceled', stage='done', finished_at=now(), message='本地登录完成，请检查账号会话' if success else '本地登录已停止')
                self.db.execute('UPDATE sessions SET status=?,payload=? WHERE id=?',(session['status'],json.dumps(session),self.id))
                self.db.execute('UPDATE executor SET owner=NULL,expires=0 WHERE id=1 AND owner=?',(self.owner,))
            self.db.execute('COMMIT')
        except BaseException:
            self.db.execute('ROLLBACK'); raise
    def close(self): self.db.close()


def stop(process):
    if not process:
        return True
    def alive():
        try:
            os.killpg(process.pid, 0)
            return True
        except ProcessLookupError:
            return False
    if alive():
        try: os.killpg(process.pid, signal.SIGTERM)
        except ProcessLookupError: pass
    try: process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGKILL); process.wait()
    deadline = time.monotonic() + 5
    while alive() and time.monotonic() < deadline:
        time.sleep(0.1)
    if alive():
        try: os.killpg(process.pid, signal.SIGKILL)
        except ProcessLookupError: pass
        deadline = time.monotonic() + 3
        while alive() and time.monotonic() < deadline:
            time.sleep(0.1)
    return not alive()


def main():
    parser = argparse.ArgumentParser(description='在执行节点本地登录 B站，账号 ID 须与后台一致')
    parser.add_argument('--account-id', required=True)
    args = parser.parse_args()
    if not re.fullmatch(r'[A-Za-z0-9_-]{1,100}', args.account_id): parser.error('账号 ID 格式无效')
    if not sys.stdin.isatty() or not sys.stdout.isatty(): parser.error('请在执行节点交互终端运行，由账号本人扫码')
    configured = os.environ.get('PUBLISHER_DATA_DIR')
    if not configured or not Path(configured).is_absolute(): parser.error('请设置与宿主一致的绝对路径 PUBLISHER_DATA_DIR')
    os.umask(0o077)
    root = Path(configured); accounts = root / 'accounts'; runtime = root / 'runtime'
    accounts.mkdir(parents=True, exist_ok=True, mode=0o700); runtime.mkdir(parents=True, exist_ok=True, mode=0o700)
    binary = biliup_binary()
    lease = LoginLease(root,args.account_id)
    process, success = None, False
    acquired = False
    def terminate(*_): raise KeyboardInterrupt()
    signal.signal(signal.SIGTERM,terminate)
    try:
        lease.acquire(); acquired = True
        with tempfile.TemporaryDirectory(prefix='bilibili-login-',dir=runtime) as directory:
            temporary = Path(directory)/'account.json'
            process = subprocess.Popen([str(binary),'-u',str(temporary),'login'],cwd=directory,start_new_session=True)
            signature = subprocess.check_output(['ps','-p',str(process.pid),'-o','lstart='],text=True).strip()
            lease.heartbeat(process.pid,signature)
            deadline = time.monotonic()+900
            while process.poll() is None:
                if time.monotonic() > deadline: raise RuntimeError('本地登录超时')
                lease.heartbeat()
                time.sleep(2)
            if process.returncode != 0 or not temporary.is_file(): raise RuntimeError('本地登录未完成')
            lease.save(temporary,accounts/(args.account_id+'.json'))
            success = True
        print('本地登录完成。请返回发布中心检查会话；未提交任何作品。')
        return 0
    except KeyboardInterrupt:
        print('本地登录已取消。'); return 1
    except Exception as exc:
        print(f'本地登录停止：{exc}',file=sys.stderr); return 1
    finally:
        # Never release the shared slot while the child can still modify a session.
        stopped = stop(process)
        if acquired and stopped: lease.finish(success)
        if not stopped:
            print("未确认整个登录进程组已停止，保留记录等待宿主恢复处理",file=sys.stderr)
        lease.close()


if __name__ == '__main__': raise SystemExit(main())
