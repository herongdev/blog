export type PortfolioLink = {
  label: string
  href: string
  external?: boolean
  note?: string
}

export type EvidenceItem = {
  title: string
  description: string
  link?: PortfolioLink
}

export type PortfolioProject = {
  id: string
  number: string
  area: 'ai' | 'enterprise' | 'finance' | 'fullstack'
  title: string
  eyebrow: string
  summary: string
  status: string
  role: string
  period?: string
  tags: string[]
  detail: string
  external?: PortfolioLink
  lead: string
  context: string
  challenge: string
  approach: string[]
  boundaries: string[]
  flow?: string[]
  evidence: EvidenceItem[]
  relatedArticles?: PortfolioLink[]
}

export type Capability = {
  id: string
  number: string
  title: string
  description: string
  focus: string[]
  projectIds: string[]
}

export type SelectedArticle = {
  title: string
  description: string
  category: string
  href: string
}

export const capabilities: Capability[] = [
  {
    id: 'ai-agent',
    number: '01',
    title: 'AI 应用与 Agent 编程',
    description: '把大模型能力做成可使用的产品，也把 Agent 放进可检查、可控制的研发流程。',
    focus: ['流式交互与引用', '工具、权限与审批', 'Trace、回放与评估'],
    projectIds: ['ai-chat', 'minicodex'],
  },
  {
    id: 'enterprise',
    number: '02',
    title: '政企系统与数字孪生',
    description: '面向长周期、复杂权限与多端协作的业务系统，承担前端架构、核心模块与空间可视化交付。',
    focus: ['Web / App 架构', 'GIS 与二维三维联动', '业务流程与工程协作'],
    projectIds: ['enterprise-platform'],
  },
  {
    id: 'finance',
    number: '03',
    title: '金融交易与原生图表',
    description: '处理实时行情、交易状态和多端图表交互，把高频变化的数据转成稳定、清晰的产品体验。',
    focus: ['实时数据链路', '多账户与复杂表格', '跨端行情图表 SDK'],
    projectIds: ['aurumchart', 'trading-system'],
  },
  {
    id: 'fullstack',
    number: '04',
    title: '商业平台与全栈交付',
    description: '从业务拆解、前后端实现到部署维护，持续交付能被真实经营场景使用的产品。',
    focus: ['商品与订单', '小程序业务闭环', '前后端与部署维护'],
    projectIds: ['shopthrive'],
  },
]

export const projects: PortfolioProject[] = [
  {
    id: 'ai-chat',
    number: '01-A',
    area: 'ai',
    title: '知序 · AI 对话',
    eyebrow: '已上线的 AI 应用',
    summary: '一个面向真实使用的 AI 对话产品，重点处理流式回答、活动过程呈现与来源引用。',
    status: '线上可用',
    role: '个人产品与工程实现',
    tags: ['AI 应用', '流式回答', '来源引用', '产品交付'],
    detail: '/projects/ai-chat/',
    external: {
      label: '打开知序',
      href: 'https://chat.herong.info/',
      external: true,
      note: '已核验线上可访问',
    },
    lead: '不是概念页面，而是可以直接访问和体验的 AI 对话应用。',
    context: '大模型回答只是起点。面向真实用户时，产品还需要让生成过程可感知、来源可追溯，并在长内容和异步状态中保持交互连续。',
    challenge: '把模型的流式输出转化为清晰、稳定的对话体验，同时避免把普通聊天产品包装成具备自主行动能力的 Agent。',
    approach: [
      '用流式反馈降低等待的不确定感，并把回答过程组织成用户可以理解的界面状态。',
      '为来源引用预留清晰的证据入口，让结论与出处能够对应。',
      '将产品定位明确为 AI 对话应用；Agent 能力只在有工具、权限和任务闭环证据时单独说明。',
    ],
    boundaries: [
      '公开页面已确认：支持流式回答、活动过程和来源引用。',
      '未公开披露的模型供应商、知识库实现和后台能力，不在作品集中做推断。',
      '工程标识：zhixu-chat-app-1。',
    ],
    flow: ['提交问题', '流式生成', '呈现活动过程', '核对来源引用'],
    evidence: [
      {
        title: '线上产品',
        description: '知序公开站点可直接访问，页面元信息与功能定位已经核验。',
        link: { label: '访问 chat.herong.info', href: 'https://chat.herong.info/', external: true },
      },
    ],
    relatedArticles: [
      {
        label: '前端如何优雅展示 SSE 流',
        href: '/posts/AI-%E5%8D%8F%E4%BD%9C%E4%B8%8E%E8%BE%B9%E7%95%8C/%E5%89%8D%E7%AB%AF%E7%94%A8%20Vue%2FReact%20%E6%80%8E%E4%B9%88%E4%BC%98%E9%9B%85%E5%B1%95%E7%A4%BA%20SSE%20%E6%B5%81%EF%BC%9F%EF%BC%88%E5%90%AB%E8%8A%82%E6%B5%81%E7%AD%96%E7%95%A5%E4%B8%8E%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5%EF%BC%89',
      },
    ],
  },
  {
    id: 'minicodex',
    number: '01-B',
    area: 'ai',
    title: 'MiniCodex',
    eyebrow: 'AI 编程 Agent 实践',
    summary: '用一组可运行的线性实验，拆解编码 Agent 的工具、权限、上下文、MCP、记忆、追踪与评估。',
    status: '课程已公开',
    role: '课程与示例工程设计',
    tags: ['Coding Agent', 'Tool Registry', '权限审批', 'Trace / Eval'],
    detail: '/projects/minicodex/',
    external: {
      label: '查看实战课程',
      href: 'https://mianshiti.net/mini-codex',
      external: true,
      note: '已核验线上可访问',
    },
    lead: '把“AI 会写代码”拆成一条可解释、可授权、可验证的工程链路。',
    context: '编码 Agent 的难点不在一次性生成代码，而在怎样读取上下文、调用工具、修改文件、执行检查，并让人能够理解和约束它的行为。',
    challenge: '在自动化效率与工程安全之间建立明确边界：哪些动作能自动执行，哪些必须审批，怎样记录过程并验证结果。',
    approach: [
      '从输入任务、保存任务和生成计划开始，让目标与执行步骤都有稳定载体。',
      '通过 Tool Registry 和权限审批约束文件、命令等能力的调用范围。',
      '在修改之后运行检查，并用 Trace、Replay、Eval 留下可回看和可评估的过程。',
      '再把后端 API、SSE 和桌面界面接入同一条任务链路，形成完整的人机协作体验。',
    ],
    boundaries: [
      '作品依据为站内系列文章与公开课程页。',
      '已失效的代码仓库链接不作为当前公开证据。',
      '这是编码 Agent 的工程实践，不等同于通用自主智能体。',
    ],
    flow: ['输入任务', '生成计划', '人工审批', '调用工具并修改', '运行检查', '记录与评估'],
    evidence: [
      {
        title: '公开课程',
        description: '课程按可运行实验组织工具、权限、上下文、MCP、Skills、记忆、Trace 与 Eval。',
        link: { label: '打开 MiniCodex 课程', href: 'https://mianshiti.net/mini-codex', external: true },
      },
      {
        title: '实现记录',
        description: '站内文章记录从 CLI 到桌面端的 V2 工程结构与关键能力。',
        link: { label: '阅读 V2 实现记录', href: '/posts/ai-agent-coding-career/mini-codex-v2-open-source' },
      },
    ],
    relatedArticles: [
      { label: 'MiniCodex V2：从 CLI 到桌面端', href: '/posts/ai-agent-coding-career/mini-codex-v2-open-source' },
      { label: '使用 AI Agent 接管项目开发的工程化思路', href: '/posts/AI-%E5%8D%8F%E4%BD%9C%E4%B8%8E%E8%BE%B9%E7%95%8C/%E4%BD%BF%E7%94%A8%20AI%20Agent%20%E6%8E%A5%E7%AE%A1%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E7%9A%84%E5%B7%A5%E7%A8%8B%E5%8C%96%E6%80%9D%E8%B7%AF' },
    ],
  },
  {
    id: 'enterprise-platform',
    number: '02-A',
    area: 'enterprise',
    title: '政企工程平台与数字孪生',
    eyebrow: '复杂业务系统交付',
    summary: '在智慧水利与工程管控项目中，处理多端架构、GIS、二维三维联动、视频接入和长流程业务。',
    status: '企业项目经验',
    role: '前端负责人 / 核心模块开发',
    period: '2020—2024',
    tags: ['Vue / React', 'OpenLayers', 'Cesium / Three.js', 'GeoServer'],
    detail: '/projects/enterprise-platform/',
    lead: '面对复杂系统，先建立可持续迭代的前端结构，再处理空间数据、设备和业务流程的交汇。',
    context: '政企项目通常包含 Web 与移动端、多角色权限、地图和三维场景、视频设备以及跨部门流程，交付周期长、协作边界多。',
    challenge: '让空间可视化与真实业务流程共存，同时保持多端代码的可维护性，并在团队协作中清楚界定个人负责范围。',
    approach: [
      '智慧水利：承担 Web / App 前端架构与框架搭建，交付核心业务模块。',
      '通过 GeoServer、SuperMap、OpenLayers、Cesium 与 Three.js 组织二维三维空间能力。',
      '接入摄像头、云台控制与全景等现场能力，使地图场景能够服务业务判断。',
      '工程管控：作为团队参与者完成 React Web 模块，以及 Vue 2 + uni-app 的移动端核心模块。',
    ],
    boundaries: [
      '智慧水利项目角色为前端负责人，重点是前端架构和核心模块。',
      '工程管控项目为团队交付，个人负责部分核心模块，不表述为独立完成整套系统。',
      '受项目保密与素材限制，不公开客户数据和未经授权的系统截图。',
    ],
    flow: ['业务与空间数据', '多端架构', '二维 / 三维场景', '设备与流程接入', '持续交付'],
    evidence: [
      {
        title: '角色边界记录',
        description: '当前作品说明来自履历中的项目职责；因企业项目限制，以职责、方法和技术范围为证据。',
      },
    ],
  },
  {
    id: 'aurumchart',
    number: '03-A',
    area: 'finance',
    title: 'AurumChart',
    eyebrow: '跨端交易图表 SDK',
    summary: '面向 Web、原生 App 与跨端产品的交易图表 SDK，覆盖 K 线、指标、实时更新和端侧交互适配。',
    status: '产品站已上线',
    role: '个人技术产品',
    tags: ['K 线', '实时行情', 'Web / H5', 'Android / iOS / HarmonyOS'],
    detail: '/projects/aurumchart/',
    external: {
      label: '访问 AurumChart',
      href: 'https://aurumchart.com/',
      external: true,
      note: '已核验产品站可访问',
    },
    lead: '把交易图表从单页组件，整理为面向不同终端和交互习惯的产品能力。',
    context: '交易产品需要在多种终端上呈现蜡烛图、指标和实时变化。不同平台在渲染、手势、生命周期和接入方式上都有差异。',
    challenge: '在多端交付中保持核心图表语义一致，同时针对各平台做交互适配，而不是简单套用同一套 Web 容器。',
    approach: [
      '将蜡烛图、技术指标和实时更新作为核心能力边界。',
      '覆盖 Web / H5、Android、iOS、HarmonyOS 与 UniApp 等产品形态。',
      '针对平台交互做适配，使缩放、拖动和实时数据更新符合端侧使用方式。',
    ],
    boundaries: [
      '页面只陈述 AurumChart 公网站点当前公开的端与能力。',
      '未公开的客户、性能数字和商业数据不作展示。',
    ],
    flow: ['统一图表语义', '平台接入层', '端侧交互适配', '实时行情更新'],
    evidence: [
      {
        title: '产品官网',
        description: '官网公开了支持终端和核心图表能力，可作为当前产品状态的直接证据。',
        link: { label: '打开 aurumchart.com', href: 'https://aurumchart.com/', external: true },
      },
    ],
  },
  {
    id: 'trading-system',
    number: '03-B',
    area: 'finance',
    title: '实时交易平台前端',
    eyebrow: '高频状态与复杂交互',
    summary: '围绕交易链路、多账户、实时推送、虚拟表格和行情图表数据源构建稳定的前端模块。',
    status: '在职项目经验',
    role: '核心前端开发',
    period: '2025—至今',
    tags: ['Vue 3 / TypeScript', 'WebSocket', 'TradingView', '虚拟列表'],
    detail: '/projects/trading-system/',
    lead: '交易界面的核心不是信息密度，而是让持续变化的状态始终可判断、可操作。',
    context: '交易平台同时承载行情、账户、订单和图表等高频变化信息，对状态一致性、渲染效率和异常恢复都有较高要求。',
    challenge: '在 WebSocket 持续推送、多账户切换和大数据表格场景下，维持清晰的数据流和稳定的交互反馈。',
    approach: [
      '基于 Vue 3、TypeScript、Vite 与 Pinia 组织模块和状态边界。',
      '围绕 WebSocket 实时更新设计页面数据链路，并处理多账户上下文。',
      '使用虚拟化表格承载高密度列表，减少无效渲染。',
      '接入 KLineChart Pro 与 TradingView Datafeed，连接行情数据与图表交互。',
      '参与上线后的独立维护，持续定位交易链路和图表数据问题。',
    ],
    boundaries: [
      '角色为核心前端开发，并非独立完成整个交易系统。',
      '不展示公司内部数据、业务截图、交易策略或未经公开的性能指标。',
    ],
    flow: ['实时行情 / 账户事件', '状态归一化', '表格与图表渲染', '交易交互', '异常定位与维护'],
    evidence: [
      {
        title: '工程复盘文章',
        description: '站内记录了图表分辨率切换后只剩一根跳动 K 线的定位过程和最小修复。',
        link: { label: '阅读 K 线问题复盘', href: '/posts/%E9%9C%80%E6%B1%82%E5%AE%9E%E7%8E%B0/%E5%88%87%E6%8D%A2%E5%88%86%E8%BE%A8%E7%8E%87%E6%97%B6%E5%87%BA%E7%8E%B0%E2%80%9C%E5%8F%AA%E5%89%A9%E4%B8%80%E6%A0%B9%E8%B7%B3%E5%8A%A8K%E7%BA%BF%E2%80%9D%E7%9A%84%E6%A0%B9%E5%9B%A0%E4%B8%8E%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%EF%BC%88%E5%90%AB%E6%9C%80%E5%B0%8F%E8%A1%A5%E4%B8%81%EF%BC%89' },
      },
    ],
    relatedArticles: [
      { label: 'WebSocket 分层封装与关闭实践', href: '/posts/%E9%9C%80%E6%B1%82%E5%AE%9E%E7%8E%B0/socket/websocket%E5%88%86%E5%B1%82%E5%B0%81%E8%A3%85%E5%AE%9E%E8%B7%B5%E5%85%B3%E9%97%AD%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5' },
      { label: '切换分辨率后只剩一根 K 线的根因', href: '/posts/%E9%9C%80%E6%B1%82%E5%AE%9E%E7%8E%B0/%E5%88%87%E6%8D%A2%E5%88%86%E8%BE%A8%E7%8E%87%E6%97%B6%E5%87%BA%E7%8E%B0%E2%80%9C%E5%8F%AA%E5%89%A9%E4%B8%80%E6%A0%B9%E8%B7%B3%E5%8A%A8K%E7%BA%BF%E2%80%9D%E7%9A%84%E6%A0%B9%E5%9B%A0%E4%B8%8E%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%EF%BC%88%E5%90%AB%E6%9C%80%E5%B0%8F%E8%A1%A5%E4%B8%81%EF%BC%89' },
    ],
  },
  {
    id: 'shopthrive',
    number: '04-A',
    area: 'fullstack',
    title: 'ShopThrive 商通',
    eyebrow: '小团队经营系统',
    summary: '面向独立商家和小团队的微信小程序经营系统，覆盖商品展示、下单、订单处理与履约。',
    status: '产品站已上线',
    role: '个人 / 工作室产品',
    tags: ['微信小程序', '商品', '订单', '全栈交付'],
    detail: '/projects/shopthrive/',
    external: {
      label: '访问商通',
      href: 'https://shopthrive.cn/',
      external: true,
      note: '原网址已跳转至 HTTPS',
    },
    lead: '围绕小团队真正要完成的经营闭环组织产品，而不是堆叠后台功能。',
    context: '独立商家需要低门槛地展示商品、接收订单并完成处理与履约，系统既要覆盖完整流程，也要控制学习和维护成本。',
    challenge: '把商品、下单、订单处理和履约连接成清晰闭环，并持续承担从产品定义到工程维护的责任。',
    approach: [
      '从商品展示与下单入口开始，保持消费者路径直接。',
      '将订单处理和履约作为商家侧主线，围绕状态推进业务。',
      '以微信小程序作为当前公开产品形态，服务独立商家与小团队。',
      '通过个人 / 工作室方式持续建设产品站和业务系统。',
    ],
    boundaries: [
      '当前公开站点确认的范围是微信小程序商家系统及其商品、订单与履约能力。',
      '未公开的客户端、商家数量与经营数据不作推断。',
    ],
    flow: ['商品展示', '用户下单', '商家处理订单', '履约完成'],
    evidence: [
      {
        title: '产品官网',
        description: 'ShopThrive 官网明确了目标用户和当前公开的业务闭环。',
        link: { label: '打开 shopthrive.cn', href: 'https://shopthrive.cn/', external: true },
      },
    ],
  },
]

export const projectMap = Object.fromEntries(
  projects.map((project) => [project.id, project]),
) as Record<string, PortfolioProject>

export const selectedArticles: SelectedArticle[] = [
  {
    title: 'MiniCodex V2：从 CLI 到桌面端',
    description: '记录任务、计划、审批、工具调用、检查、Trace 与桌面界面的完整演进。',
    category: 'AI / Agent',
    href: '/posts/ai-agent-coding-career/mini-codex-v2-open-source',
  },
  {
    title: '使用 AI Agent 接管项目开发的工程化思路',
    description: '讨论怎样把 Agent 放进真实项目流程，并保留边界、验证和人工责任。',
    category: 'AI 协作',
    href: '/posts/AI-%E5%8D%8F%E4%BD%9C%E4%B8%8E%E8%BE%B9%E7%95%8C/%E4%BD%BF%E7%94%A8%20AI%20Agent%20%E6%8E%A5%E7%AE%A1%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E7%9A%84%E5%B7%A5%E7%A8%8B%E5%8C%96%E6%80%9D%E8%B7%AF',
  },
  {
    title: 'WebSocket 分层封装与关闭实践',
    description: '从连接生命周期、职责拆分和关闭语义出发，整理实时链路的工程边界。',
    category: '实时系统',
    href: '/posts/%E9%9C%80%E6%B1%82%E5%AE%9E%E7%8E%B0/socket/websocket%E5%88%86%E5%B1%82%E5%B0%81%E8%A3%85%E5%AE%9E%E8%B7%B5%E5%85%B3%E9%97%AD%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5',
  },
  {
    title: '切换分辨率时只剩一根跳动 K 线：根因与最小补丁',
    description: '一次交易图表数据问题的定位路径、根因判断和最小改动验证。',
    category: '图表 / 调试',
    href: '/posts/%E9%9C%80%E6%B1%82%E5%AE%9E%E7%8E%B0/%E5%88%87%E6%8D%A2%E5%88%86%E8%BE%A8%E7%8E%87%E6%97%B6%E5%87%BA%E7%8E%B0%E2%80%9C%E5%8F%AA%E5%89%A9%E4%B8%80%E6%A0%B9%E8%B7%B3%E5%8A%A8K%E7%BA%BF%E2%80%9D%E7%9A%84%E6%A0%B9%E5%9B%A0%E4%B8%8E%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%EF%BC%88%E5%90%AB%E6%9C%80%E5%B0%8F%E8%A1%A5%E4%B8%81%EF%BC%89',
  },
  {
    title: '一次提交，同时发布到 GitHub Pages 与云服务器',
    description: '用一条交付链路维护静态站的双目标发布，并保留环境配置边界。',
    category: '交付工程',
    href: '/posts/%E4%BA%91%E5%BC%80%E5%8F%91/%E9%98%BF%E9%87%8C%E4%BA%91/%E6%8F%90%E4%BA%A4%E4%B8%80%E6%AC%A1%E4%BB%A3%E7%A0%81%EF%BC%8C%E5%90%8C%E6%97%B6%E5%8F%91%E5%B8%83%E5%88%B0%20GitHub%20Pages%20%2B%20%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8%EF%BC%88VitePress%2F%E9%9D%99%E6%80%81%E7%AB%99%EF%BC%89',
  },
]

export const experienceTimeline = [
  {
    period: '2025—至今',
    title: '实时交易平台',
    role: '核心前端开发',
    description: '负责交易链路、多账户、实时推送、虚拟表格与行情图表数据接入，并参与上线后的持续维护。',
  },
  {
    period: '2022—2024',
    title: '智慧水利与数字孪生',
    role: '前端负责人',
    description: '承担 Web / App 前端架构、核心模块，以及 GIS、二维三维场景和现场设备能力接入。',
  },
  {
    period: '2020—2022',
    title: '工程管控平台',
    role: '团队成员 / 核心模块开发',
    description: '参与 React Web 与 Vue 2 + uni-app 移动端建设，负责部分核心业务模块。',
  },
] as const
