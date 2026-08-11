---
title: "React + D3.js 1"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "当我想象在网络上的数据，我目前最喜欢的环境中使用 D3.js 一个内部 React.js 应用。 什么是React.js？ 点我以了解更多详细信息 ἰ 什么是D3.js？ 点我以了解更多详细信息 ἰ 众所周知，这两种技术很难结合。问题的症结在于 他们俩都想处理DOM 。 让我们从。"
sidebarWeight: 5
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/react性能优化/React + D3.js 1.md"
---
::: v-pre

# React + D3.js 1

> 本节目标：理解“React + D3.js 1”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==当我想象在网络上的数据，我目前最喜欢的环境中使用==**D3.js**==一个内部==**React.js**==应用。==
**什么是React.js？**
_点我以了解更多详细信息_
_ἰ_
**什么是D3.js？**
_点我以了解更多详细信息_
_ἰ_
众所周知，这两种技术很难结合。问题的症结在于**他们俩都想处理DOM**。
==让我们从头开始吧？==
**＃****创建SVG元素**
当在浏览器中可视化数据时，我们通常希望使用**SVG**元素，因为它们更具表现力，并且位置绝对。不确定是什么**SVG**？[在SVG上](https://developer.mozilla.org/en-US/docs/Web/SVG/)
查看[MDN文档](https://developer.mozilla.org/en-US/docs/Web/SVG/)，或了解[在Web浏览器中进行绘制的不同方法](https://wattenberger.com/blog/d3#drawing-svg-shapes)。
首先，我们将渲染一个简单的\<svg\>元素。
Svg.jsx
const Svg = () =\> \{
return (
\<svg style=\{\{
border: "2px solid gold"
\}\} /\>
)
\}
我们添加了一个==金色==边框，以便我们可以看到我们的元素。 \<svg\>
像🥧一样容易，对吗？
为了可视化数据，我们将数据点表示为形状。让我们从一个简单的基本形状开始：a 。 [\<circle\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle)
Circle.jsx（D3版本）
1 。
const Circle = () =\> \{
2 。
const ref = useRef()
3 。
4 。
useEffect(() =\> \{
5 。
const svgElement = d3.select(ref.current)
6 。
svgElement.append("circle")
7 。
.attr("cx", 150)
8 。
.attr("cy", 70)
9 。
.attr("r", 50)
10 。
\}, [])
11 。
12 。
return (
13 。
\<svg
14 。
ref=\{ref\}
15 。
/\>
16 。
)
17 。
\}
我们的组件做了一些新的事情：

- 1。使用ref来存储对渲染元素的引用 \<svg\>
- 2。组件挂载时运行d3代码
- 3。用于d3.select()将我们ref变成**d3选择对象**
- 4。使用我们的**D3选择对象**到append一个元素 \<circle\>

但这是很多绘制单个形状的代码，不是吗？难道我们不应该尽可能少地使用React **ref**吗？
避免将ref用于可以声明式完成的任何事情。
_React文档_
幸运的是，自[React v15](https://reactjs.org/blog/2016/04/07/react-v15.html)以来，JSX已支持所有**SVG**元素。这意味着创建元素就像... \<circle\>
Circle.jsx（反应版本）
const Circle = () =\> \{
return (
\<svg\>
\<circle
cx="150"
cy="77"
r="40"
/\>
\</svg\>
)
\}
使用标准JSX而不是在挂载上运行d3代码有什么好处？

- **声明式****而不是****命令式******代码描述_了_正在绘制的内容，而不是_如何_ 绘制它。
- **更少的代码******我们的第二个Circle组件的行数不到第一次迭代的三分之二/
- 相对而言，React的**hacky少一些**，主要是一个渲染库，并且进行了许多优化以保持我们的Web应用程序的性能。当使用d3添加元素时，我们会在React周围乱搞，实际上必须_与_这些优化作斗争。在您的JS框架周围进行黑客入侵是导致未来沮丧的秘诀，尤其是当框架的API更改时。

这一切都很好，但是渲染许多元素呢？
**＃****创建许多SVG元素**
d3.js的核心概念之一是**将数据绑定到DOM元素**。如果您不熟悉d3.s数据绑定概念，建议您[在Observable](https://observablehq.com/@d3/selection-join)上阅读它[，](https://observablehq.com/@d3/selection-join)或者使用[Fullstack Data Visualization和D3](https://newline.co/fullstack-d3)获取完整的[摘要](https://newline.co/fullstack-d3)。
让我们生成一个包含10个随机[x, y]坐标的数据集。
**我们如何生成这些数据？**
_点我以了解更多详细信息_
_ἰ_
如果我们\<circle\>在每个位置绘制一个，会是什么样？从朴素的d3代码开始：
Circles.jsx（D3版本）
1 。
const Circles = () =\> \{
2 。
const [dataset, setDataset] = useState(
3 。
generateDataset()
4 。
)
5 。
const ref = useRef()
6 。
7 。
useEffect(() =\> \{
8 。
const svgElement = d3.select(ref.current)
9 。
svgElement.selectAll("circle")
10 。
.data(dataset)
11 。
.join("circle")
12 。
.attr("cx", d =\> d[0])
13 。
.attr("cy", d =\> d[1])
14 。
.attr("r", 3)
15 。
\}, [dataset])
16 。
17 。
useInterval(() =\> \{
18 。
const newDataset = generateDataset()
19 。
setDataset(newDataset)
20 。
\}, 2000)
21 。
22 。
return (
23 。
\<svg
24 。
viewBox="0 0 100 50"
25 。
ref=\{ref\}
26 。
/\>
27 。
)
28 。
\}
该代码看起来与我们之前的代码非常相似，但有两个更改：

- 1。我们正在创建所有\<circle\>元素的选择，并使用d3选择的方法为每个数据点添加一个圆 [.join()](https://github.com/d3/d3-selection#selection_join)
- 2。每当dataset更改时，我们都会重新运行d3代码
- 3。我们正在使用useInterval()（从[React Hooks中的Think](https://wattenberger.com/blog/react-hooks)末尾开始）每两秒钟重新计算一次 dataset

请注意，\<svg\>默认情况下，s为300px x 150px-在这种情况下，我们使用元素来重新定义工作网格，因此我们可以使用更友好的数字。 viewBox

好的，我们回到了原来的问题：我们的代码有点**命令性**，**冗长**而**笨拙**。使用React渲染s会是什么样子？ \<circle\>
Circles.jsx（反应版本）
1 。
const Circles = () =\> \{
2 。
const [dataset, setDataset] = useState(
3 。
generateDataset()
4 。
)
5 。
6 。
useInterval(() =\> \{
7 。
const newDataset = generateDataset()
8 。
setDataset(newDataset)
9 。
\}, 2000)
10 。
11 。
return (
12 。
\<svg viewBox="0 0 100 50"\>
13 。
\{dataset.map(([x, y], i) =\> (
14 。
\<circle
15 。
cx=\{x\}
16 。
cy=\{y\}
17 。
r="3"
18 。
/\>
19 。
))\}
20 。
\</svg\>
21 。
)
22 。
\}
更清晰！在这段代码中，我们是...

- 1。遍历每个数据点，以及
- 2。呈现\<circle于[x, y]
但是d3非常适合为进入和退出过渡设置动画！
_你可能_
我们都知道d3可以很好地跟踪哪些元素是新元素，以及对元素进行动画处理。如果你不[读书的话](https://newline.co/fullstack-d3)。
让我们看一个带有过渡的示例：
Transitions.jsx（D3版本）
1 。
const AnimatedCircles = () =\> \{
2 。
const [visibleCircles, setVisibleCircles] = useState(
3 。
generateCircles()
4 。
)
5 。
const ref = useRef()
6 。
7 。
useInterval(() =\> \{
8 。
setVisibleCircles(generateCircles())
9 。
\}, 2000)
10 。
11 。
useEffect(() =\> \{
12 。
const svgElement = d3.select(ref.current)
13 。
svgElement.selectAll("circle")
14 。
.data(visibleCircles, d =\> d)
15 。
.join(
16 。
enter =\> (
17 。
enter.append("circle")
18 。
.attr("cx", d =\> d * 15 + 10)
19 。
.attr("cy", 10)
20 。
.attr("r", 0)
21 。
.attr("fill", "cornflowerblue")
22 。
.call(enter =\> (
23 。
enter.transition().duration(1200)
24 。
.attr("cy", 10)
25 。
.attr("r", 6)
26 。
.style("opacity", 1)
27 。
))
28 。
),
29 。
update =\> (
30 。
update.attr("fill", "lightgrey")
31 。
),
32 。
exit =\> (
33 。
exit.attr("fill", "tomato")
34 。
.call(exit =\> (
35 。
exit.transition().duration(1200)
36 。
.attr("r", 0)
37 。
.style("opacity", 0)
38 。
.remove()
39 。
))
40 。
),
41 。
)
42 。
\}, [dataset])
43 。
44 。
return (
45 。
\<svg
46 。
viewBox="0 0 100 20"
47 。
ref=\{ref\}
48 。
/\>
49 。
)
50 。
\}
哇，这是很多代码！
**不要觉得需要经历所有的过程**-要点是我们有6 \<circle\>s，并且每两秒钟，我们会随机选择其中的一些来显示。

- 1。新的圆圈以蓝色动画显示，
- 2。停留了多个回合的圆圈变成了灰色，
- 3。新一轮以外的社交圈会以红色显示，

好的，所以我们可以看到该代码很难扫描，但是我们如何使用React来实现呢？
Transitions.jsx（D3版本）
1 。
const AnimatedCircles = () =\> \{
2 。
const [visibleCircles, setVisibleCircles] = useState(
3 。
generateCircles()
4 。
)
5 。
6 。
useInterval(() =\> \{
7 。
setVisibleCircles(generateCircles())
8 。
\}, 2000)
9 。
10 。
return (
11 。
\<svg viewBox="0 0 100 20"\>
12 。
\{allCircles.map(d =\> (
13 。
\<AnimatedCircle
14 。
key=\{d\}
15 。
index=\{d\}
16 。
isShowing=\{visibleCircles.includes(d)\}
17 。
/\>
18 。
))\}
19 。
\</svg\>
20 。
)
21 。
\}
22 。
23 。
const AnimatedCircle = (\{ index, isShowing \}) =\> \{
24 。
const wasShowing = useRef(false)
25 。
26 。
useEffect(() =\> \{
27 。
wasShowing.current = isShowing
28 。
\}, [isShowing])
29 。
30 。
const style = useSpring(\{
31 。
config: \{
32 。
duration: 1200,
33 。
\},
34 。
r: isShowing ? 6 : 0,
35 。
opacity: isShowing ? 1 : 0,
36 。
\})
37 。
38 。
return (
39 。
\<animated.circle \{...style\}
40 。
cx=\{index * 15 + 10\}
41 。
cy="10"
42 。
fill=\{
43 。
!isShowing ? "tomato" :
44 。
!wasShowing.current ? "cornflowerblue" :
45 。
"lightgrey"
46 。
\}
47 。
/\>
48 。
)
49 。
\}
动画元素_出来_是不是很简单的反应，那么就让所有的\<circle\>渲染S，并为他们提供opacity，如果他们在当前显示的圈子里没有。
在此代码中，我们：

- 1个。遍历allCircles数组并为每个项目创建一个， \<AnimatedCircle\>
- 2个。定义AnimatedCircle支撑道具的组件：（用于定位），以及 indexisShowing
- 3。缓存最后一个isShowing值，因此我们可以看到\<circle\>进入还是退出
- 4。使用[react-spring](https://www.react-spring.io/)的useSpring钩子为的**半径**和**不透明度**设置动画 \<circle\>
- 5。使用animated从[反应弹簧](https://www.react-spring.io/)动画我们的，传播我们的动画值作为元素的属性 \<circle\>

尽管此代码不一定比d3代码_短_很多，但它更易于阅读。
**＃****轴数**
d3.js API是可扩展的，我们可以依靠它来为我们完成繁重的工作。特别是通过几种方法，这些方法将为我们创建多个DOM元素。
例如，该.axisBottom()方法将在一行代码中创建整个图表轴！
Axis.jsx（d3版本）
1 。
const Axis = () =\> \{
2 。
const ref = useRef()
3 。
4 。
useEffect(() =\> \{
5 。
const xScale = d3.scaleLinear()
6 。
.domain([0, 100])
7 。
.range([10, 290])
8 。
9 。
const svgElement = d3.select(ref.current)
10 。
const axisGenerator = d3.axisBottom(xScale)
11 。
svgElement.append("g")
12 。
.call(axisGenerator)
13 。
\}, [])
14 。
15 。
return (
16 。
\<svg
17 。
ref=\{ref\}
18 。
/\>
19 。
)
20 。
\}
0102030405060708090100
太简单！创建底轴所需要做的就是：

- 1。创建一个将数据值（0 - 100）转换为相应物理位置（10px - 290px）的标度对电子**秤**不是很熟悉吗？通过使用[Fullstack D3和Data Visualization](https://www.newline.co/fullstack-d3)真正了解它们，或者在[技术文档中](https://github.com/d3/d3-scale)获取详细信息
- 2。将\<svg\>元素存储在中，ref并创建一个包含该元素的**d3选择对象**
- 3。通过我们的规模.axisBottom()来创建一个 axisGenerator
- 4。创建一个新\<g\>元素来容纳轴的DOM元素
- 5。.call()我们axisGenerator在我们的新元素上。这实际上与表达式相同： \<g\>const newG = svgElement.append("g")axisGenerator(newG)但这使我们能够保持d3方法链的持续发展

好吧，这很容易，不是吗？不幸的是，我们宁愿让事情保持React-y（出于上述所有原因）。
因此，如果我们不能用.axisBottom()创造我们的轴DOM元素，什么_可以_做什么？
Axis.jsx（反应版本）
1 。
const Axis = () =\> \{
2 。
const ticks = useMemo(() =\> \{
3 。
const xScale = d3.scaleLinear()
4 。
.domain([0, 100])
5 。
.range([10, 290])
6 。
7 。
return xScale.ticks()
8 。
.map(value =\> (\{
9 。
value,
10 。
xOffset: xScale(value)
11 。
\}))
12 。
\}, [])
13 。
14 。
return (
15 。
\<svg\>
16 。
\<path
17 。
d="M 9.5 0.5 H 290.5"
18 。
stroke="currentColor"
19 。
/\>
20 。
\{ticks.map((\{ value, xOffset \}) =\> (
21 。
\<g
22 。
key=\{value\}
23 。
transform=\{`translate(${xOffset}, 0)`\}
24 。
\>
25 。
\<line
26 。
y2="6"
27 。
stroke="currentColor"
28 。
/\>
29 。
\<text
30 。
key=\{value\}
31 。
style=\{\{
32 。
fontSize: "10px",
33 。
textAnchor: "middle",
34 。
transform: "translateY(20px)"
35 。
\}\}\>
36 。
\{ value \}
37 。
\</text\>
38 。
\</g\>
39 。
))\}
40 。
\</svg\>
41 。
)
42 。
\}
0102030405060708090100
虽然我们不想使用创建DOM元素（.axisBottom()）的d3方法，但_可以_使用d3在内部创建轴的d3方法！

- 1。创建一个将数据值（0 - 100）转换为相应物理位置（10px - 290px）的标度
- 2。使用我们的d3比例尺 .ticks()方法.ticks()比例尺的方法将返回一个大约10个均等值的数组，这些值跨过比例尺domain。在中了解更多 [d3文档中。](https://github.com/d3/d3-scale#continuous_ticks)我们xScale的.ticks()方法将返回：[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
- 3。映射我们的滴答值数组，并创建一个包含value和的对象xOffset（使用转换） xScale
- 4。创建一个\<path\>标记我们轴顶部的元素。它开始于[9, 0]并水平移动到 [290, 0]
- 5。对于我们的每个刻度，我们想要创建一个向右移动适当像素数的**组**。我们的每个组都将包含一个刻度，\<line\>并包含刻度值 \<text\>

好的！因此，这绝对是更多代码。但这是有道理的，因为我们基本上是在我们自己的代码库中复制某些d3库代码。
但问题是这样的：_我们的新代码更具可读性_-仅通过查看return 语句，我们就知道要渲染的元素。另外，我们可以将所有这些逻辑提取到一个 Axis组件中。我们可以根据自己的喜好自定义它，而不必再次考虑这种额外的逻辑。
更具可重用性的Axis组件是什么样的？
Axis.jsx（反应版本）
1 。
const Axis = (\{
2 。
domain=[0, 100],
3 。
range=[10, 290],
4 。
\}) =\> \{
5 。
const ticks = useMemo(() =\> \{
6 。
const xScale = d3.scaleLinear()
7 。
.domain(domain)
8 。
.range(range)
9 。
10 。
const width = range[1] - range[0]
11 。
const pixelsPerTick = 30
12 。
const numberOfTicksTarget = Math.max(
13 。
1,
14 。
Math.floor(
15 。
width / pixelsPerTick
16 。
)
17 。
)
18 。
19 。
return xScale.ticks(numberOfTicksTarget)
20 。
.map(value =\> (\{
21 。
value,
22 。
xOffset: xScale(value)
23 。
\}))
24 。
\}, [
25 。
domain.join("-"),
26 。
range.join("-")
27 。
])
28 。
29 。
return (
30 。
\<svg\>
31 。
\<path
32 。
d=\{[
33 。
"M", range[0], 6,
34 。
"v", -6,
35 。
"H", range[1],
36 。
"v", 6,
37 。
].join(" ")\}
38 。
fill="none"
39 。
stroke="currentColor"
40 。
/\>
41 。
\{ticks.map((\{ value, xOffset \}) =\> (
42 。
\<g
43 。
key=\{value\}
44 。
transform=\{`translate(${xOffset}, 0)`\}
45 。
\>
46 。
\<line
47 。
y2="6"
48 。
stroke="currentColor"
49 。
/\>
50 。
\<text
51 。
key=\{value\}
52 。
style=\{\{
53 。
fontSize: "10px",
54 。
textAnchor: "middle",
55 。
transform: "translateY(20px)"
56 。
\}\}\>
57 。
\{ value \}
58 。
\</text\>
59 。
\</g\>
60 。
))\}
61 。
\</svg\>
62 。
)
63 。
\}
我们的Axis组件将有两个道具：domain和。 range
_尝试更新道具值：_
**领域：**
[，]
**范围：**
[，]
0102030405060708090100
我们真的不需要在这里进行很多更改！让我们看一下主要更新：

- 1。我们会检查范围以动态更改我们想要的刻度数（可以通过将数字传递给来设置）。 .ticks()请注意，这.ticks()将针对传递的滴答数，但也会遵循更友好的整数。例如，您可以通过，10但最后有12个滴答声。我们的目标是每30像素1个刻度，最小为1。
- 2。我们想ticks在道具改变时重新计算。我们要重视**价值观**我们和数组，而不是数组引用，因此我们将它们放入一个字符串。例如，我们要检查字符串而不是对array的**引用**。这将使我们能够在的父组件中创建and数组。 domainrange.join()"0-100"[0, 100]domainrangeAxis
- 3。很小的变化，但可能很重要。我们会添加一个重复的_第一个_和_最后一个_刻度，以防刻度不覆盖的顶部或底部。例如，和（单击以更新示例） domain[0, 100][10, 150]

现在，我们的Axis组件目前仅适用于图表底部的轴。但是希望这能使您充分了解复制d3的轴绘制方法有多么容易。
有关涵盖所有轴方向的完整示例，请查看[Fullstack D3和数据可视化](https://www.newline.co/fullstack-d3)
我使用此方法重新创建任何创建多个元素的d3方法。除了使用React呈现元素的通常好处（**声明性的**和**减少hacky的**）之外，我发现对于不熟悉d3 API的其他开发人员来说，此代码更容易理解。
我们真正做到了两全其美，因为d3 API公开了许多内部方法。
**＃****规模和响应度**
调整图表的大小可能很棘手！因为我们需要精确定位数据元素，所以不能使用依赖于\<div\>s和的响应大小的常规Web开发技巧\<spans\>。
如果您阅读了许多d3.js示例，您将知道有一种常见的图表大小调整方法。这是我在[Fullstack D3和Data Visualization中](https://www.newline.co/fullstack-d3)使用的术语：
**最佳**
**正确的**
**底部**
**剩下**

- **包装器******是图表的范围以及元素的尺寸 \<svg\>
- **边界******包含数据元素，但不包括边距和图例
- **边距******决定**边界**的填充

我们需要将**包装**盒和**界限**框分开，因为在使用构建图表时，我们需要知道它们的确切尺寸。 \<svg\>
ChartWithDimensions.jsx
1 。
const chartSettings = \{
2 。
"marginLeft": 75
3 。
\}
4 。
const ChartWithDimensions = () =\> \{
5 。
const [ref, dms] = useChartDimensions(chartSettings)
6 。
7 。
const xScale = useMemo(() =\> (
8 。
d3.scaleLinear()
9 。
.domain([0, 100])
10 。
.range([0, dms.boundedWidth])
11 。
), [dms.boundedWidth])
12 。
13 。
return (
14 。
\<div
15 。
className="Chart__wrapper"
16 。
ref=\{ref\}
17 。
style=\{\{ height: "200px" \}\}\>
18 。
\<svg width=\{dms.width\} height=\{dms.height\}\>
19 。
\<g transform=\{`translate($\{[
20 。
dms.marginLeft,
21 。
dms.marginTop
22 。
].join(",")\})`\}\>
23 。
\<rect
24 。
width=\{dms.boundedWidth\}
25 。
height=\{dms.boundedHeight\}
26 。
fill="lavender"
27 。
/\>
28 。
\<g transform=\{`translate($\{[
29 。
0,
30 。
dms.boundedHeight,
31 。
].join(",")\})`\}\>
32 。
\<Axis
33 。
domain=\{xScale.domain()\}
34 。
range=\{xScale.range()\}
35 。
/\>
36 。
\</g\>
37 。
\</g\>
38 。
\</svg\>
39 。
\</div\>
40 。
)
41 。
\}
42 。
_尝试更新__chartSettings__值：_
**宽度：**
-
**高度：**
-
**marginTop ：**
-
**marginRight ：**
-
**marginBottom ：**
-
**marginLeft ：**
75
05101520253035404550556065707580859095100
这个例子有点复杂-让我们逐步进行到底。这里要注意的主要部分是...

- 1。使用自定义钩子来计算**包装器**和**边界**的尺寸（**稍后**详细介绍）对React Hooks不太熟悉？[在“ React Hooks](https://wattenberger.com/blog/react-hooks)中的[思考”中](https://wattenberger.com/blog/react-hooks)阅读更多内容。
- 2。使用 dms具有计算尺寸对象创建x比例尺
- 3。使用做出反应ref，从我们的自定义挂钩传递一个_非SVG_是包装元素_被大小，我们希望我们_**的包装**_是_
- 4。转换图表的主要部分以尊重我们的**顶部** 和**左侧** **边距**

既然我们已经知道如何使用**wrapper**，**bounds**和**margins**，那么让我们看一下自定义钩子在做什么。
useChartDimensions.js
1 。
import ResizeObserver from '@juggle/resize-observer'
2 。
3 。
const useChartDimensions = passedSettings =\> \{
4 。
const ref = useRef()
5 。
const dimensions = combineChartDimensions(
6 。
passedSettings
7 。
)
8 。
9 。
const [width, setWidth] = useState(0)
10 。
const [height, setHeight] = useState(0)
11 。
12 。
useEffect(() =\> \{
13 。
if (dimensions.width && dimensions.height)
14 。
return [ref, dimensions]
15 。
16 。
const element = ref.current
17 。
const resizeObserver = new ResizeObserver(
18 。
entries =\> \{
19 。
if (!Array.isArray(entries)) return
20 。
if (!entries.length) return
21 。
22 。
const entry = entries[0]
23 。
24 。
if (width != entry.contentRect.width)
25 。
setWidth(entry.contentRect.width)
26 。
if (height != entry.contentRect.height)
27 。
setHeight(entry.contentRect.height)
28 。
\}
29 。
)
30 。
resizeObserver.observe(element)
31 。
32 。
return () =\> resizeObserver.unobserve(element)
33 。
\}, [])
34 。
35 。
const newSettings = combineChartDimensions(\{
36 。
...dimensions,
37 。
width: dimensions.width || width,
38 。
height: dimensions.height || height,
39 。
\})
40 。
41 。
return [ref, newSettings]
42 。
\}
当我们将设置对象传递给我们的自定义钩子时，它将... useChartDimensions

- 1。使用预设的默认值填充缺失的**边距**。**combineChartDimensions** **是自定义函数******_展开以查看CombineChartDimensions的外观____ἰ_
- 2。遵循传递的height和width，如果在中指定passedSettings
- 3。当传递的元素更改大小时，使用来重新计算尺寸 [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)ResizeObserver是[目前并非所有的浏览器都支持](https://caniuse.com/#feat=resizeobserver)，所以我们使用[这个调整大小观察员](https://www.npmjs.com/package/@juggle/resize-observer)填充工具，以确保在所有浏览器这个作品。
- 4。抓取我们**包装纸**尺寸的容器的**高度**和**宽度** \<div\>
- 5。计算**边界**的尺寸（名为和） boundedHeightboundedWidth

请注意，我们未设置的所有设置都会自动填写。例如，我们可以指定一个特定的，或者使用React从包装元素中获取值。 heightuseChartDimensionsref
希望这可以使您了解如何以响应快速，简便的方式处理图表尺寸。随意抓住我的自定义钩子-我真的很喜欢用一个简单的内衬计算出我的**包装器**，**边界**和**边距**。 useChartDimensions
**＃****地图**
因此，您已经看到了使用d3来创建详细地图的人们的绝妙示例，以及可以旋转的地球仪。而且您也想这样做。
不用担心！我们可以让d3做很多繁重的工作，并立即获得地图！首先，让我们看一下我们的地图！尝试更改投影，d3带有许多有趣的选项：
要使用d3中内置的所有投影，请[在此有关d3的博客文章](https://wattenberger.com/blog/d3#maps-and-globes)中进行检查。
Map.jsx
1 。
const Map = (\{ projectionName = "geoArmadillo" \}) =\> \{
2 。
// grab our custom React hook we defined above
3 。
const [ref, dms] = useChartDimensions(\{\})
4 。
5 。
// this is the definition for the whole Earth
6 。
const sphere = \{ type: "Sphere" \}
7 。
8 。
const projectionFunction = d3[projectionName]
9 。
|| d3GeoProjection[projectionName]
10 。
const projection = projectionFunction()
11 。
.fitWidth(dms.width, sphere)
12 。
const pathGenerator = d3.geoPath(projection)
13 。
14 。
// size the svg to fit the height of the map
15 。
const [
16 。
[x0, y0],
17 。
[x1, y1]
18 。
] = pathGenerator.bounds(sphere)
19 。
const height = y1
20 。
21 。
return (
22 。
\<div
23 。
ref=\{ref\}
24 。
style=\{\{
25 。
width: "100%",
26 。
\}\}
27 。
\>
28 。
\<svg width=\{dms.width\} height=\{height\}\>
29 。
\<defs\>
30 。
\{/* some projections bleed outside the edges of the Earth's sphere */\}
31 。
\{/* let's create a clip path to keep things in bounds */\}
32 。
\<clipPath id="Map__sphere"\>
33 。
\<path d=\{pathGenerator(sphere)\} /\>
34 。
\</clipPath\>
35 。
\</defs\>
36 。
37 。
\<path
38 。
d=\{pathGenerator(sphere)\}
39 。
fill="#f2f2f7"
40 。
/\>
41 。
42 。
\<g style=\{\{ clipPath: "url(#Map__sphere)" \}\}\>
43 。
\{/* we can even have graticules! */\}
44 。
\<path
45 。
d=\{pathGenerator(d3.geoGraticule10())\}
46 。
fill="none"
47 。
stroke="#fff"
48 。
/\>
49 。
50 。
\{countryShapes.features.map((shape) =\> \{
51 。
return (
52 。
\<path
53 。
key=\{shape.properties.subunit\}
54 。
d=\{pathGenerator(shape)\}
55 。
fill="#9980FA"
56 。
stroke="#fff"
57 。
\>
58 。
\<title\>
59 。
\{shape.properties.name\}
60 。
\</title\>
61 。
\</path\>
62 。
)
63 。
\})\}
64 。
\</g\>
65 。
\</svg\>
66 。
\</div\>
67 。
)
68 。
\}
这里有很多代码，但是创建整个地图确实不多！让我们看一下要点：

- 1。首先，我们需要创建一个projection。这是我们国家/地区形状定义与我们在2D屏幕上绘制3D形状的方式之间的映射。我们将使用该方法在组件的宽度内调整地图的大小，并使用创建一个来为我们的地球和国家/地区形状生成路径定义。 [.fitWidth()](https://github.com/d3/d3-geo#projection_fitWidth) pathGenerator [d3.geoPath()](https://github.com/d3/d3-geo#geoPath)
- 2。接下来，我们将sphere在投影中找到整个地球（）的尺寸，并将height svg的值分配给球体的高度。
- 3。一些投影的形状会在地球边缘之外渗出，因此我们将使用使其保持在边界内clipPath。
- 4。我们可以使用pathGenerator函数将[GeoJSON](https://macwright.com/2015/03/23/geojson-second-bite.html)形状定义转换为属性字符串。首先，我们将整个地球绘制为浅灰色。 \<path\> d
- 5。**d3- geo**有一些很棒的方法，例如这将有助于我们绘制方格线以供参考。 [d3.geoGraticule10()](https://github.com/d3/d3-geo#geoGraticule10)
- 6。最后但并非最不重要的一点，我们将绘制我们的国家形状！我们可以通过将GeoJSON定义传递给pathGenerator函数来绘制不同类型的地理形状。例如，我们要导入[国家/地区定义的列表](https://github.com/Wattenberger/Wattenberger-2019/tree/master/src/components/Blog/posts/D3AndReact/countries.json)，然后创建具有其形状的元素。 \<path\>

一旦掌握了基础知识，这就是绘制地理的一种非常灵活的方法！诀窍是将d3视为一系列工具。
我通常将使用Canvas绘制地图，因为渲染许多SVG元素会变慢，并且地图通常具有大量的形状。

如果您想以Canvas渲染为例，并在国家/地区上方绘制气泡以可视化指标，请查看此[Svelte配方](https://svelte.recipes/components/world-map)。该代码在Svelte.js中，但是大多数将转换为React！特别是功能。 drawCanvas
**＃****复杂的可视化布局**
我们已经掌握了基本知识！我们介绍了：

- 如何绘制svg元素
- 如何绘制**许多**svg元素
- 如何复制内置的d3方法来绘制轴等复杂元素
- 如何轻松调整图表大小
- 如何绘制地图！

根据我的经验，最重要的规则是**了解您的工具**。一旦您对使用SVG进行绘图，使用d3作为实用程序库并构建React.js代码感到满意，您将真正能够做出您可以想象的一切。这是学习基础知识的美妙之处，而不仅仅是获取图表库-它要学习的工作很多，但功能却更强大。
为了获得启发，以下是我整理的一些自定义可视化效果：

[](https://wattenberger.com/fishing)

_玩转国际捕鱼数据_

[](https://2019.stateofjs.com/overview/)

_JS 2019状态的自定义视图，显示了多年来不同Javascript工具的用法和意见如何变化_

[](https://js-tools.netlify.app/)

_通过The State of JS 2019数据查看Javascript工具之间的共同使用_

[](https://loa.mit.edu/#/Database)

_动画的月球任务可视化，显示有趣的指标，例如任务的类型，组织以及任务是否成功_
数据可视化领域中我最喜欢的部分是：

- 我们还没有探索多少形式，
- 共享可以多么简单，以及
- 他们可能产生的影响，尤其是在可交互时

在网络上创建自定义的交互式可视化文件时，我们将获得世界上最好的。
如果您觉得这篇文章很有用，我很想听听您[在Twitter上发表的文章](https://twitter.com/wattenberger)！
 \> 来自 \<[https://wattenberger.com/blog/react-and-d3](https://wattenberger.com/blog/react-and-d3)\>
     [](https://wattenberger.com/fishing)[](https://2019.stateofjs.com/overview/)[](https://js-tools.netlify.app/)[](https://loa.mit.edu/#/Database)
\> 来自 \<[https://wattenberger.com/blog/react-and-d3](https://wattenberger.com/blog/react-and-d3)\>

:::
