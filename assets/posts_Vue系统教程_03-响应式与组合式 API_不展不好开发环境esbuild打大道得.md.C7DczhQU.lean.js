import{_ as n,o as e,c as i,j as s,a}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"不展不好开发环境esbuild打大道得","description":"创建开发时执行脚本， 位置在根目录的 scripts/ 下面，参数为要打包的模块：。","frontmatter":{"title":"不展不好开发环境esbuild打大道得","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","响应式与组合式 API"],"description":"创建开发时执行脚本， 位置在根目录的 scripts/ 下面，参数为要打包的模块：。","sidebarWeight":58,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/vue3/不展不好开发环境esbuild打大道得.md"},"headers":[],"relativePath":"posts/Vue系统教程/03-响应式与组合式 API/不展不好开发环境esbuild打大道得.md","filePath":"posts/Vue系统教程/03-响应式与组合式 API/不展不好开发环境esbuild打大道得.md"}'),p={name:"posts/Vue系统教程/03-响应式与组合式 API/不展不好开发环境esbuild打大道得.md"};function t(c,l,u,o,d,r){return e(),i("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"不展不好开发环境esbuild打大道得",tabindex:"-1"},[a("不展不好开发环境esbuild打大道得 "),s("a",{class:"header-anchor",href:"#不展不好开发环境esbuild打大道得","aria-label":'Permalink to "不展不好开发环境esbuild打大道得"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“不展不好开发环境esbuild打大道得”的核心思路，并能把它用于实际开发或面试表达。")]),s("blockquote",null,[s("p",null,"说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。 ==创建开发时执行脚本，== ==位置在根目录的====scripts/====下面，参数为要打包的模块：==")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"==修改根目录下的====package.json====文件，添加====srcipts====，名为====dev====：==")]),a(`
`),s("span",{class:"line"},[s("span",null,'"scripts": {')]),a(`
`),s("span",{class:"line"},[s("span",null,'  "dev": "node scripts/dev.js reactivity -f global"')]),a(`
`),s("span",{class:"line"},[s("span",null,"}")]),a(`
`),s("span",{class:"line"},[s("span",null,"其中reactivity -f global均为命令行参数，可以使用命令行工具解析出来；")]),a(`
`),s("span",{class:"line"},[s("span",null,"reactiivity为包的名称，-f表示打包后的格式选项，-f后的值为打包格式")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"==新建====scripts/dev.ts==")]),a(`
`),s("span",{class:"line"},[s("span",null,"const { build } = require('esbuild')")]),a(`
`),s("span",{class:"line"},[s("span",null,"const { resolve } = require('path')")]),a(`
`),s("span",{class:"line"},[s("span",null,"const args = require('minimist')(process.argv.slice(2));")]),a(`
`),s("span",{class:"line"},[s("span",null,"运行npm run dev时，node会去package.json的sciripts中找到dev命令对应的值，即以下命令：")]),a(`
`),s("span",{class:"line"},[s("span",null,"$ node scripts/dev.ts reactivity -f global")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"打印args，输出如下：")]),a(`
`),s("span",{class:"line"},[s("span",null,"{ _: [ 'reactivity' ], f: 'global' }")]),a(`
`),s("span",{class:"line"},[s("span",null,"可见，如果参数前有-或--，就会被当成属性名，而接下来的参数被当作这个属性名的属性值；")]),a(`
`),s("span",{class:"line"},[s("span",null,"如果没有--或-，就会被放在键名为_的属性上，其属性值为一个数组，依次为每个没有--或-开头的参数；如：")]),a(`
`),s("span",{class:"line"},[s("span",null,"$ node scripts/dev.ts reactivity -f global --x xxx abadd")]),a(`
`),s("span",{class:"line"},[s("span",null,"{ _: [ 'reactivity', 'abadd' ], f: 'global', x: 'xxx' }")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"// 最好与要打包的包文件夹同名，方便找到要打包的包的package.json文件，以及拼接输出目录地址dist")]),a(`
`),s("span",{class:"line"},[s("span",null,"// 开发环境下，一般只打包packages/下的一个包，这样可以加快打包速度，我们对文件的修改马上就能看到结果；")]),a(`
`),s("span",{class:"line"},[s("span",null,"const target = args._[0] || 'reactivity';")]),a(`
`),s("span",{class:"line"},[s("span",null,"const format = args.f || 'global';")]),a(`
`),s("span",{class:"line"},[s("span",null,"const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));")]),a(`
`),s("span",{class:"line"},[s("span",null,"const outputFormat = format.startsWith('global')// 输出的格式，值为esbuild支持的配置项")]),a(`
`),s("span",{class:"line"},[s("span",null,"  ? 'iife'")]),a(`
`),s("span",{class:"line"},[s("span",null,"  : format === 'cjs'")]),a(`
`),s("span",{class:"line"},[s("span",null,"    ? 'cjs'")]),a(`
`),s("span",{class:"line"},[s("span",null,"    : 'esm'")]),a(`
`),s("span",{class:"line"},[s("span",null,"const outfile = resolve( // 输出的文件")]),a(`
`),s("span",{class:"line"},[s("span",null,"  __dirname,")]),a(`
`),s("span",{class:"line"},[s("span",null,"  `../packages/${target}/dist/${target}.${format}.js`")]),a(`
`),s("span",{class:"line"},[s("span",null,")")]),a(`
`),s("span",{class:"line"},[s("span",null,"build({")]),a(`
`),s("span",{class:"line"},[s("span",null,"  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],")]),a(`
`),s("span",{class:"line"},[s("span",null,"  outfile,")]),a(`
`),s("span",{class:"line"},[s("span",null,"  bundle: true, // 把所有的包打包到一起")]),a(`
`),s("span",{class:"line"},[s("span",null,"  sourcemap: true,")]),a(`
`),s("span",{class:"line"},[s("span",null,"  format: outputFormat,// iife|cjs|esm")]),a(`
`),s("span",{class:"line"},[s("span",null,"  globalName: pkg.buildOptions?.name,")]),a(`
`),s("span",{class:"line"},[s("span",null,"  platform: format === 'cjs' ? 'node' : 'browser',")]),a(`
`),s("span",{class:"line"},[s("span",null,"  watch: { // 监控文件变化")]),a(`
`),s("span",{class:"line"},[s("span",null,"    onRebuild(error) {")]),a(`
`),s("span",{class:"line"},[s("span",null,"      if (!error) console.log(`rebuilt~~~~`)")]),a(`
`),s("span",{class:"line"},[s("span",null,"    }")]),a(`
`),s("span",{class:"line"},[s("span",null,"  }")]),a(`
`),s("span",{class:"line"},[s("span",null,"}).then(() => {")]),a(`
`),s("span",{class:"line"},[s("span",null,"  console.log('watching~~~')")]),a(`
`),s("span",{class:"line"},[s("span",null,"})")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"build配置选项中，指定了：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"入口；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"打包后的文件路径和文件名；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"产生的代码的模块格式类型；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"代码运行的平台；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"如果打包成iife格式，全局的变量名是什么；")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"输入pnpm run dev进行打包，速度非常快，适合开发环境中使用：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"打包后的文件：")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"packages/reactivity/dist/reactivity.global.js")]),a(`
`),s("span",{class:"line"},[s("span",null,"var VueReactivity = (() => {")]),a(`
`),s("span",{class:"line"},[s("span",null,"})();")]),a(`
`),s("span",{class:"line"},[s("span",null,"//# sourceMappingURL=reactivity.global.js.map")]),a(`
`),s("span",{class:"line"},[s("span",null,"其中的 var VueReactivity正是我们配置的globalName，也是packages/reactivity/package.json中buildOptions中配置的name选项；")]),a(`
`),s("span",{class:"line"},[s("span",null,"我们在修改代码的时候，esbuild会立即进行打包，速度非常快：")]),a(`
`),s("span",{class:"line"},[s("span",null,"var VueReactivity = (() => {")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // packages/shared/src/index.ts")]),a(`
`),s("span",{class:"line"},[s("span",null,"  var isObject = (arg) => {")]),a(`
`),s("span",{class:"line"},[s("span",null,'    return arg && typeof arg === "object";')]),a(`
`),s("span",{class:"line"},[s("span",null,"  };")]),a(`
`),s("span",{class:"line"},[s("span",null,"  // packages/reactivity/src/index.ts")]),a(`
`),s("span",{class:"line"},[s("span",null,"  console.log(isObject({}));")]),a(`
`),s("span",{class:"line"},[s("span",null,"})();")]),a(`
`),s("span",{class:"line"},[s("span",null,"//# sourceMappingURL=reactivity.global.js.map")])])])])],-1)])])}const h=n(p,[["render",t]]);export{v as __pageData,h as default};
