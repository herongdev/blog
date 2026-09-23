import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const d=JSON.parse('{"title":"Transform.js","description":"解决角度为 90 的整数倍导致 Math.cos 得到极小的数，其实是 0 。导致不渲染 由于 image 自带了 x\\\\y\\\\z ，所有加上 translate 前缀。","frontmatter":{"title":"Transform.js","date":"2026-08-11T00:00:00.000Z","categories":["Vue 系统教程"],"tags":["Vue","Vue3","前端","教程","OneNote","项目实战"],"description":"解决角度为 90 的整数倍导致 Math.cos 得到极小的数，其实是 0 。导致不渲染 由于 image 自带了 x\\\\y\\\\z ，所有加上 translate 前缀。","sidebarWeight":52,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/实战/vue手势AlloyFinger用法/Transform.js.md"},"headers":[],"relativePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/Transform.js.md","filePath":"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/Transform.js.md"}'),p={name:"posts/Vue系统教程/07-项目实战/vue手势AlloyFinger用法/Transform.js.md"};function i(c,l,r,u,o,m){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"transform-js",tabindex:"-1"},[s("Transform.js "),n("a",{class:"header-anchor",href:"#transform-js","aria-label":'Permalink to "Transform.js"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Transform.js”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"/* transformjs")]),s(`
`),n("span",{class:"line"},[n("span",null," * By dntzhang")]),s(`
`),n("span",{class:"line"},[n("span",null," */")]),s(`
`),n("span",{class:"line"},[n("span",null,"; (function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    var Matrix3D = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.elements = window.Float32Array ? new Float32Array(16) : [];")]),s(`
`),n("span",{class:"line"},[n("span",null,"        var te = this.elements;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        te[0] = (n11 !== undefined) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        te[1] = n21 || 0; te[5] = (n22 !== undefined) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        te[2] = n31 || 0; te[6] = n32 || 0; te[10] = (n33 !== undefined) ? n33 : 1; te[14] = n34 || 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = (n44 !== undefined) ? n44 : 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Matrix3D.DEG_TO_RAD = Math.PI / 180;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    Matrix3D.prototype = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var te = this.elements;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        identity: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.set(")]),s(`
`),n("span",{class:"line"},[n("span",null,"                1, 0, 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 1, 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 1, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 0, 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"            );")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        multiplyMatrices: function (a, be) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var ae = a.elements;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var te = this.elements;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[s("解决角度为"),n("code",null,"90"),s("的整数倍导致"),n("code",null,"Math.cos"),s("得到极小的数，其实是"),n("code",null,"0"),s("。导致不渲染")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        _rounded: function (value, i) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            i = Math.pow(10, i || 15);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // default")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return Math.round(value * i) / i;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        appendTransform: function (x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var rx = rotateX * Matrix3D.DEG_TO_RAD;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var cosx = this._rounded(Math.cos(rx));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var sinx = this._rounded(Math.sin(rx));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var ry = rotateY * Matrix3D.DEG_TO_RAD;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var cosy = this._rounded(Math.cos(ry));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var siny = this._rounded(Math.sin(ry));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var rz = rotateZ * Matrix3D.DEG_TO_RAD;")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var cosz = this._rounded(Math.cos(rz * -1));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var sinz = this._rounded(Math.sin(rz * -1));")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.multiplyMatrices(this, [")]),s(`
`),n("span",{class:"line"},[n("span",null,"                1, 0, 0, x,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, cosx, sinx, y,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, -sinx, cosx, z,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 0, 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.multiplyMatrices(this, [")]),s(`
`),n("span",{class:"line"},[n("span",null,"                cosy, 0, siny, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 1, 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                -siny, 0, cosy, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 0, 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.multiplyMatrices(this, [")]),s(`
`),n("span",{class:"line"},[n("span",null,"                cosz * scaleX, sinz * scaleY, 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                -sinz * scaleX, cosz * scaleY, 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 1 * scaleZ, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                0, 0, 0, 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (skewX || skewY) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.multiplyMatrices(this, [")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    this._rounded(Math.cos(skewX * Matrix3D.DEG_TO_RAD)), this._rounded(Math.sin(skewX * Matrix3D.DEG_TO_RAD)), 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    -1 * this._rounded(Math.sin(skewY * Matrix3D.DEG_TO_RAD)), this._rounded(Math.cos(skewY * Matrix3D.DEG_TO_RAD)), 0, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    0, 0, 1, 0,")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    0, 0, 0, 1")]),s(`
`),n("span",{class:"line"},[n("span",null,"                ]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (originX || originY || originZ) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];")]),s(`
`),n("span",{class:"line"},[n("span",null,"                this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return this;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function observe(target, props, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        for (var i = 0, len = props.length; i < len; i++) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            var prop = props[i];")]),s(`
`),n("span",{class:"line"},[n("span",null,"            watch(target, prop, callback);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function watch(target, prop, callback) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        Object.defineProperty(target, prop, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            get: function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'                return this["__" + prop];')]),s(`
`),n("span",{class:"line"},[n("span",null,"            },")]),s(`
`),n("span",{class:"line"},[n("span",null,"            set: function (value) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'                if (value !== this["__" + prop]) {')]),s(`
`),n("span",{class:"line"},[n("span",null,'                    this["__" + prop] = value;')]),s(`
`),n("span",{class:"line"},[n("span",null,"                    callback();")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    window.Transform = function (element) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        observe(")]),s(`
`),n("span",{class:"line"},[n("span",null,"            element,")]),s(`
`),n("span",{class:"line"},[n("span",null,'            ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"],')]),s(`
`),n("span",{class:"line"},[n("span",null,"            function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                var mtx = element.matrix3D.identity().appendTransform(element.translateX, element.translateY, element.translateZ, element.scaleX, element.scaleY, element.scaleZ, element.rotateX, element.rotateY, element.rotateZ, element.skewX, element.skewY, element.originX, element.originY, element.originZ);")]),s(`
`),n("span",{class:"line"},[n("span",null,'                element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";')]),s(`
`),n("span",{class:"line"},[n("span",null,"            });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        observe(")]),s(`
`),n("span",{class:"line"},[n("span",null,"            element,")]),s(`
`),n("span",{class:"line"},[n("span",null,'            ["perspective"],')]),s(`
`),n("span",{class:"line"},[n("span",null,"            function () {")]),s(`
`),n("span",{class:"line"},[n("span",null,'                element.style.transform = element.style.msTransform = element.style.OTransform = element.style.MozTransform = element.style.webkitTransform = "perspective(" + element.perspective + "px) matrix3d(" + Array.prototype.slice.call(element.matrix3D.elements).join(",") + ")";')]),s(`
`),n("span",{class:"line"},[n("span",null,"            });")]),s(`
`),n("span",{class:"line"},[n("span",null,"        element.matrix3D = new Matrix3D();")]),s(`
`),n("span",{class:"line"},[n("span",null,"        element.perspective = 500;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        element.scaleX = element.scaleY = element.scaleZ = 1;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //")])])])]),n("p",null,[s("由于"),n("code",null,"image"),s("自带了"),n("code",null,"x\\y\\z"),s("，所有加上"),n("code",null,"translate"),s("前缀")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"        element.translateX = element.translateY = element.translateZ = element.rotateX = element.rotateY = element.rotateZ = element.skewX = element.skewY = element.originX = element.originY = element.originZ = 0;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})();")])])])])],-1)])])}const h=a(p,[["render",i]]);export{d as __pageData,h as default};
