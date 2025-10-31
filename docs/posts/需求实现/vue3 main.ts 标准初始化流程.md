```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/locales";
import directives from "@/directives";
import "virtual:svg-icons-register";
import "@/assets/styles/main.css";
import videojs from "video.js";
import "@/services/security/register";
import { initStorageSync } from "@/utils/storage-sync";
import { useAuthStore } from "@/store";

/**
 * 应用初始化：采用"挂载前完成状态恢复"的策略，
 * 确保首个路由守卫读取到一致的认证状态，避免刷新时误判跳转。
 */
async function bootstrap() {
  const app = createApp(App);

  // 创建 Pinia 并启用持久化（保证 store 能从存储中恢复）
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);

  // 将 videojs 挂到全局，供 i18n/指令在安装阶段读取
  window.videojs = videojs;

  app.use(i18n);
  app.use(directives);
  app.use(router);

  // 在"首个路由守卫执行前"同步恢复认证状态，消除守卫×存储恢复的竞态
  const auth = useAuthStore();
  auth.hydrateFromStorage();

  // 注册多标签页登录状态同步（尽早监听 storage 事件，避免极端情况下错过早期事件）
  initStorageSync();

  // 等待"初始导航 + 守卫链 + 异步组件"就绪，再挂载，防止首屏闪跳
  await router.isReady();

  app.mount("#app");

  if (import.meta.env.DEV) {
    console.log("[App] 应用启动完成");
  }
}

// 启动应用（统一的初始化错误处理）
bootstrap().catch((error) => {
  console.error("[App] 应用启动失败:", error);
  // TODO: 这里可渲染错误页或做降级处理
});
```
