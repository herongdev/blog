import{_ as s,o as a,c as p,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"createElement源码","description":"围绕“createElement源码”整理的概念、示例与实践笔记。","frontmatter":{"title":"createElement源码","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","原理与手写实现"],"description":"围绕“createElement源码”整理的概念、示例与实践笔记。","sidebarWeight":6,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/原理 2/ReactElement/createElement源码.md"},"headers":[],"relativePath":"posts/React系统教程/03-原理与手写实现/ReactElement/createElement源码.md","filePath":"posts/React系统教程/03-原理与手写实现/ReactElement/createElement源码.md"}'),i={name:"posts/React系统教程/03-原理与手写实现/ReactElement/createElement源码.md"};function t(c,l,r,o,u,d){return a(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"createelement源码",tabindex:"-1"},[e("createElement源码 "),n("a",{class:"header-anchor",href:"#createelement源码","aria-label":'Permalink to "createElement源码"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“createElement源码”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function createElement(type, config, children) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var propName; // Reserved names are extracted")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var props = {};")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var key = null;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var ref = null;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var self = null;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  var source = null;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  if (config != null) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    if (hasValidRef(config)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      ref = config.ref;")]),e(`
`),n("span",{class:"line"},[n("span",null,"      {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        warnIfStringRefCannotBeAutoConverted(config);")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    if (hasValidKey(config)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      key = '' + config.key;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    self = config.__self === undefined ? null : config.__self;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object")]),e(`
`),n("span",{class:"line"},[n("span",null,"    for (propName in config) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        props[propName] = config[propName];")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  } // Children can be more than one argument, and those are transferred onto")]),e(`
`),n("span",{class:"line"},[n("span",null,"  // the newly allocated props object.")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  var childrenLength = arguments.length - 2;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  if (childrenLength === 1) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    props.children = children;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  } else if (childrenLength > 1) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    var childArray = Array(childrenLength);")]),e(`
`),n("span",{class:"line"},[n("span",null,"    for (var i = 0; i < childrenLength; i++) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      childArray[i] = arguments[i + 2];")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      if (Object.freeze) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        Object.freeze(childArray);")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    props.children = childArray;")]),e(`
`),n("span",{class:"line"},[n("span",null,"  } // Resolve default props")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"  if (type && type.defaultProps) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    var defaultProps = type.defaultProps;")]),e(`
`),n("span",{class:"line"},[n("span",null,"    for (propName in defaultProps) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      if (props[propName] === undefined) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        props[propName] = defaultProps[propName];")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  {")]),e(`
`),n("span",{class:"line"},[n("span",null,"    if (key || ref) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;")]),e(`
`),n("span",{class:"line"},[n("span",null,"      if (key) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        defineKeyPropWarningGetter(props, displayName);")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"      if (ref) {")]),e(`
`),n("span",{class:"line"},[n("span",null,"        defineRefPropWarningGetter(props, displayName);")]),e(`
`),n("span",{class:"line"},[n("span",null,"      }")]),e(`
`),n("span",{class:"line"},[n("span",null,"    }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  }")]),e(`
`),n("span",{class:"line"},[n("span",null,"  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);")]),e(`
`),n("span",{class:"line"},[n("span",null,"}")])])])])],-1)])])}const h=s(i,[["render",t]]);export{m as __pageData,h as default};
