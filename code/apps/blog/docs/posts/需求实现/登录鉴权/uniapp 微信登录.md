# uniapp 使用 微信登录

- 微信开放平台注册 app, 通过审核后得到 appId 和 AppSecret;
- 在 uniapp 的 manifest.json 中配置好启用微信登录，配置 appId;
- 编写代码，使用 uni.login，指定 provide 为 weixin，就可以一微得到 code;
- 由于使用了原生登录，所以需要重新打包自定义基座；然后重新运行，测试登录 ；
- 将 code 发送给后端，后端使用 code 换取 access_token;
- 后端使用 access_token 获取用户信息; 其中有 unionid;通过数据库查找是否有相应的用户，没有则创建用户;如果有则更新用户信息;
- 后端使用用户信息生成 token;并返回给前端;
- 前端存储后端返回的 token; 并使用后端返回的 token 进行之后的请求;
