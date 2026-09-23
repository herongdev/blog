import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"券商服务器（或流动性提供商）特定格式","description":"sessions quote / sessions trade 数据到底是什么？ 现象 解释 每个 symbol 都附带 sessions quote 和 sessions trade，长度固定 7 这是券商服务器（或流动性提供商）为该 symbol 设定的可报价/可交易时间表。","frontmatter":{"title":"券商服务器（或流动性提供商）特定格式","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","进阶语言能力"],"description":"sessions quote / sessions trade 数据到底是什么？ 现象 解释 每个 symbol 都附带 sessions quote 和 sessions trade，长度固定 7 这是券商服务器（或流动性提供商）为该 symbol 设定的可报价/可交易时间表。","sidebarWeight":41,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/webworkers/券商服务器（或流动性提供商）特定格式.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/07-进阶语言能力/券商服务器（或流动性提供商）特定格式.md","filePath":"posts/JavaScript系统教程/07-进阶语言能力/券商服务器（或流动性提供商）特定格式.md"}'),u={name:"posts/JavaScript系统教程/07-进阶语言能力/券商服务器（或流动性提供商）特定格式.md"};function i(c,l,o,t,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"券商服务器-或流动性提供商-特定格式",tabindex:"-1"},[s("券商服务器（或流动性提供商）特定格式 "),n("a",{class:"header-anchor",href:"#券商服务器-或流动性提供商-特定格式","aria-label":'Permalink to "券商服务器（或流动性提供商）特定格式"'},"​")]),n("blockquote",null,[n("p",null,[s("本节目标：理解“券商服务器（或流动性提供商）特定格式”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"sessions_quote / sessions_trade 数据到底是什么？")])]),n("table",{tabindex:"0"},[n("thead",null,[n("tr",null,[n("th"),n("th")])]),n("tbody",null,[n("tr",null,[n("td",null,[n("strong",null,"现象")]),n("td",null,[n("strong",null,"解释")])]),n("tr",null,[n("td",null,"每个 symbol 都附带 sessions_quote 和 sessions_trade，长度固定 7"),n("td",null,[n("strong",null,"这是券商服务器（或流动性提供商）为该 symbol 设定的可报价/可交易时间表"),s("，按"),n("strong",null,"服务器本地时区"),s("（常见 MT5 / cTrader 接口格式），而不是统一 UTC，更不是官方交易所数据。")])]),n("tr",null,[n("td",null,"每天的 open/close 是整数 0–1440"),n("td",null,"表示「距离当天 00:00 的分钟数」。例：open = 60 ⇒ 01:00；close = 1439 ⇒ 23:59。")]),n("tr",null,[n("td",null,[n("strong",null,"为什么同一 BTCUSD 在不同平台时间不一致？")]),n("td",null,[s("BTC 现货链上 24/7，但 "),n("strong",null,"券商层面可能"),s("：")])]),n("tr",null,[n("td",null,"① 每周固定维护窗口（如周日凌晨停 15 min）；"),n("td")]),n("tr",null,[n("td",null,"② 控制杠杆或风险，需要短暂停盘；"),n("td")]),n("tr",null,[n("td",null,[n("strong",null,"因此时间段由券商定，不同平台会不同"),s("。")]),n("td")]),n("tr",null,[n("td",null,"外汇也是 OTC，没有全球统一交易所，券商自定会话更常见。"),n("td")]),n("tr",null,[n("td",null,"sessions_quote vs sessions_trade"),n("td",null,"有的平台允许“只报价不成交”时段（报价 session 早于或晚于交易 session）。如果你只关心「能否下单」，以 sessions_trade 为准。")])])]),n("p",null,[n("strong",null,"结论"),s("：把这些 session 当成“"),n("strong",null,"Broker-Level 市场时间"),s("”，视为独立市场即可。关键是知道“这些分钟数在哪个时区”——通常就是券商服务器时区，需要后端接口同时返回一个字段（如 server_timezone: 'UTC+2' 或 Europe/London）。如果拿不到，就必须与你后端确认。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"{")]),s(`
`),n("span",{class:"line"},[n("span",null,'  "BTCUSD.sd": {')]),s(`
`),n("span",{class:"line"},[n("span",null,'    "sessions_quote": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 840,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 855')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ],")]),s(`
`),n("span",{class:"line"},[n("span",null,'    "sessions_trade": [')]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"      [")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 840,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 0')]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,'          "close": 1440,')]),s(`
`),n("span",{class:"line"},[n("span",null,'          "open": 855')]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"      ]")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ],")]),s(`
`),n("span",{class:"line"},[n("span",null,"  },")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const g=a(u,[["render",i]]);export{m as __pageData,g as default};
