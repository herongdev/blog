---
title: "React + D3.js"
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
description: "When I visualize data on the web, my current favorite environment is using D3.js inside of a React.js application. These two technologies ar。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/react性能优化/React + D3.js.md"
---
::: v-pre

# React + D3.js

> 本节目标：理解“React + D3.js”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
When I visualize data on the web, my current favorite environment is using **D3.js** inside of a **React.js** application.
These two technologies are notoriously tricky to combine. The crux of the issue is that **they both want to handle the DOM**.
Let's start at the beginning, shall we?
# ****Creating SVG elements
When visualizing data in the browser, we'll usually want to work with **SVG** elements, since they're much more expressive and are absolutely positioned.Not totally sure what **SVG** is?
Check out the [MDN docs on SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/), or learn about [the different ways to draw in a web browser](https://wattenberger.com/blog/d3#drawing-svg-shapes).
To start, we'll just render a simple \<svg\> element.
Svg.jsx
const Svg = () =\> \{
return (
\<svg style=\{\{
border: "2px solid gold"
\}\} /\>
)
\}
We've added a ==gold== border so we can see our \<svg\> element.
Easy as 🥧, right?
To visualize data, we'll want to represent data points as shapes. Let's start with a simple basic shape: a [\<circle\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle).
Circle.jsx (d3 version)
const Circle = () =\> \{
const ref = useRef()
useEffect(() =\> \{
const svgElement = d3.select(ref.current)
svgElement.append("circle")
.attr("cx", 150)
.attr("cy", 70)
.attr("r", 50)
\}, [])
return (
\<svg
ref=\{ref\}
/\>
)
\}

- 1.uses a ref to store a reference to our rendered \<svg\> element
- 2.runs d3 code when the Component mounts
- 3.uses d3.select() to turn our ref into a **d3 selection object**
- 4.uses our **d3 selection object** to append a \<circle\> element

Thankfully, all **SVG** elements have been supported in JSX since [React v15](https://reactjs.org/blog/2016/04/07/react-v15.html). Which means that creating a \<circle\> element is as easy as...
Circle.jsx (React version)
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
What are the benefits of using standard JSX instead of running d3 code on mount?

- **Declarative** **instead of** **imperative******The code describes _what_ is being drawn, instead of _how_ to draw it.
- **Less code******Our second Circle component has fewer than two-thirds the number of lines as our first iteration/
    - **Less hacky******React is, chiefly, a rendering library, and has many optimizations to keep our web apps performant. When adding elements using d3, we're hacking around React, and essentially have to fight _against_ those optimizations. Hacking around your JS framework is a recipe for future frustration, especially if the framework's API changes.

This is all well and good, but what about rendering many elements?
# ****Creating many SVG elements
One of the core concepts of d3.js is **binding data to DOM elements**.If you're unfamiliar with d3.s data binding concept, I'd recommend reading up on it [on Observable](https://observablehq.com/@d3/selection-join) or getting a full rundown with [Fullstack Data Visualization and D3](https://newline.co/fullstack-d3).
Let's generate a dataset of 10 random [x, y] coordinates.
What would it look like if we drew a \<circle\> at each of these locations? Starting with the naive d3 code:
Circles.jsx (d3 version)
const Circles = () =\> \{
const [dataset, setDataset] = useState(
generateDataset()
)
const ref = useRef()
useEffect(() =\> \{
const svgElement = d3.select(ref.current)
svgElement.selectAll("circle")
.data(dataset)
.join("circle")
.attr("cx", d =\> d[0])
.attr("cy", d =\> d[1])
.attr("r", 3)
\}, [dataset])
useInterval(() =\> \{
const newDataset = generateDataset()
setDataset(newDataset)
\}, 2000)
return (
\<svg
viewBox="0 0 100 50"
ref=\{ref\}
/\>
)
\}

- 1.We're creating a selection of all \<circle\> elements and using our d3 selection's [.join()](https://github.com/d3/d3-selection#selection_join) method to add a circle for each data point
- 2.We're re-running our d3 code whenever dataset changes
- 3.We're using useInterval() (from the end of [Thinking in React Hooks](https://wattenberger.com/blog/react-hooks)) to re-calculate our dataset every two seconds

Note that \<svg\>s are, by default, 300px x 150px - in this case, we're using the viewBox element to re-define our working grid, just so we can use friendlier numbers.

Okay, we're back to our original issues: our code is a bit **imperative**, **verbose**, and **hacky**. What would this look like using React to render our \<circle\>s?
Circles.jsx (React version)
const Circles = () =\> \{
const [dataset, setDataset] = useState(
generateDataset()
)
useInterval(() =\> \{
const newDataset = generateDataset()
setDataset(newDataset)
\}, 2000)
return (
\<svg viewBox="0 0 100 50"\>
\{dataset.map(([x, y], i) =\> (
\<circle
cx=\{x\}
cy=\{y\}
r="3"
/\>
))\}
\</svg\>
)
\}

- 1.Looping over each data point, and
- 2.rendering a \<circle at [x, y]
But d3 is great at animating enter and exit transitions!
you, probably

We all know that d3 is great at keeping track of what elements are new and animating elements in and out. And if you don't you should [read a book](https://newline.co/fullstack-d3).
Let's look at an example with transitions:
Transitions.jsx (d3 version)
const AnimatedCircles = () =\> \{
const [visibleCircles, setVisibleCircles] = useState(
generateCircles()
)
const ref = useRef()
useInterval(() =\> \{
setVisibleCircles(generateCircles())
\}, 2000)
useEffect(() =\> \{
const svgElement = d3.select(ref.current)
svgElement.selectAll("circle")
.data(visibleCircles, d =\> d)
.join(
enter =\> (
enter.append("circle")
.attr("cx", d =\> d * 15 + 10)
.attr("cy", 10)
.attr("r", 0)
.attr("fill", "cornflowerblue")
.call(enter =\> (
enter.transition().duration(1200)
.attr("cy", 10)
.attr("r", 6)
.style("opacity", 1)
))
),
update =\> (
update.attr("fill", "lightgrey")
),
exit =\> (
exit.attr("fill", "tomato")
.call(exit =\> (
exit.transition().duration(1200)
.attr("r", 0)
.style("opacity", 0)
.remove()
))
),
)
\}, [dataset])
return (
\<svg
viewBox="0 0 100 20"
ref=\{ref\}
/\>
)
\}
Wow, this is a lot of code!

- 1.circles that are new are animated in in blue,
- 2.circles that stay for multiple rounds turn grey,
- 3.circles that aren't in the new round are animated out in red,

Okay, so we can see that this code is hard to scan, but how would we implement this using React?
Transitions.jsx (d3 version)
const AnimatedCircles = () =\> \{
const [visibleCircles, setVisibleCircles] = useState(
generateCircles()
)
useInterval(() =\> \{
setVisibleCircles(generateCircles())
\}, 2000)
return (
\<svg viewBox="0 0 100 20"\>
\{allCircles.map(d =\> (
\<AnimatedCircle
key=\{d\}
index=\{d\}
isShowing=\{visibleCircles.includes(d)\}
/\>
))\}
\</svg\>
)
\}
const AnimatedCircle = (\{ index, isShowing \}) =\> \{
const wasShowing = useRef(false)
useEffect(() =\> \{
wasShowing.current = isShowing
\}, [isShowing])
const style = useSpring(\{
config: \{
duration: 1200,
\},
r: isShowing ? 6 : 0,
opacity: isShowing ? 1 : 0,
\})
return (
\<animated.circle \{...style\}
cx=\{index * 15 + 10\}
cy="10"
fill=\{
!isShowing ? "tomato" :
!wasShowing.current ? "cornflowerblue" :
"lightgrey"
\}
/\>
)
\}
Animating elements _out_ is not very straightforward in React, so let's keep all of the \<circle\>s rendered, and give them an opacity if they're not in the currently shown circles.

- 1.loop over our allCircles array and create a \<AnimatedCircle\> for each item,
- 2.define a AnimatedCircle component that takes to props: index (for positioning), and isShowing
- 3.cache the last isShowing value, so we can see whether the \<circle\> is entering or exiting
- 4.use the useSpring hook from [react-spring](https://www.react-spring.io) to animate the \<circle\>'s **radius** and **opacity**
- 5.use animated from [react-spring](https://www.react-spring.io) to animate our \<circle\>'s and spread our animated values as element attributes

While this code isn't necessarily much _shorter_ than the d3 code, it is a lot easier to read.
# ****Axes
The d3.js API is expansive, and we can become reliant on it to do the heavy lifting for us. Especially with the several methods that will create several DOM elements for us.
For example, the .axisBottom() method will create a whole chart axis in one line of code!
Axis.jsx (d3 version)
const Axis = () =\> \{
const ref = useRef()
useEffect(() =\> \{
const xScale = d3.scaleLinear()
.domain([0, 100])
.range([10, 290])
const svgElement = d3.select(ref.current)
const axisGenerator = d3.axisBottom(xScale)
svgElement.append("g")
.call(axisGenerator)
\}, [])
return (
\<svg
ref=\{ref\}
/\>
)
\}
0102030405060708090
100

- 1.create a scale that converts from the data values (0 - 100) to the corresponding physical location (10px - 290px)Not super familiar with **scales**?Really understand them by working through [Fullstack D3 and Data Visualization](https://www.newline.co/fullstack-d3), or get the details in the [technical docs](https://github.com/d3/d3-scale)
- 2.store the \<svg\> element in a ref and create a **d3 selection object** containing it
- 3.pass our scale to .axisBottom() to create an axisGenerator
- 4.create a new \<g\> element to house our axis' DOM elements
- 5..call() our axisGenerator on our new \<g\> element. This is effectively the same as the expression:const newG = svgElement.append("g")axisGenerator(newG)but it lets us keep the chain of d3 methods going

Well that was pretty easy, wasn't it? Unfortunately, we would prefer to keep things React-y (for all of the reasons mentioned above).
So if we can't use .axisBottom() to create our axis DOM elements, what _can_ we do?
Axis.jsx (React version)
const Axis = () =\> \{
const ticks = useMemo(() =\> \{
const xScale = d3.scaleLinear()
.domain([0, 100])
.range([10, 290])
return xScale.ticks()
.map(value =\> (\{
value,
xOffset: xScale(value)
\}))
\}, [])
return (
\<svg\>
\<path
d="M 9.5 0.5 H 290.5"
stroke="currentColor"
/\>
\{ticks.map((\{ value, xOffset \}) =\> (
\<g
key=\{value\}
transform=\{`translate(${xOffset}, 0)`\}
\>
\<line
y2="6"
stroke="currentColor"
/\>
\<text
key=\{value\}
style=\{\{
fontSize: "10px",
textAnchor: "middle",
transform: "translateY(20px)"
\}\}\>
\{ value \}
\</text\>
\</g\>
))\}
\</svg\>
)
\}
0102030405060708090
100

- 1.create a scale that converts from the data values (0 - 100) to the corresponding physical location (10px - 290px)
- 2.use our d3 scale's .ticks() methodThe .ticks() method of a scale will return an array of approximately 10 equally-spaced values that span the scale's domain. Learn more in the [d3 docs.](https://github.com/d3/d3-scale#continuous_ticks)Our xScale's .ticks() method will return:[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
- 3.map over our array of tick values and create an object that contains the value and xOffset (converted using xScale)
- 4.create a \<path\> element that marks that top of our axis. It starts at [9, 0] and moves horizontally to [290, 0]
- 5.for each of our ticks, we want to create a **group** that is shifted the appropriate number of pixels to the right.Each of our groups will contain a tick \<line\> and \<text\> containing the tick value

Okay! So this is definitely more code. But that makes sense, since we're basically duplicating some of the d3 library code, in our own code base.
But here's the thing: _our new code is way more readable_ - we know what elements we're rendering just by looking at the return statement. Plus, we can extract all of this logic into a single Axis component. This we we can customize it however we like, without having to think about this extra logic again.
What would a more re-useable Axis component look like?
Axis.jsx (React version)
const Axis = (\{
domain=[0, 100],
range=[10, 290],
\}) =\> \{
const ticks = useMemo(() =\> \{
const xScale = d3.scaleLinear()
.domain(domain)
.range(range)
const width = range[1] - range[0]
const pixelsPerTick = 30
const numberOfTicksTarget = Math.max(
1,
Math.floor(
width / pixelsPerTick
)
)
return xScale.ticks(numberOfTicksTarget)
.map(value =\> (\{
value,
xOffset: xScale(value)
\}))
\}, [
domain.join("-"),
range.join("-")
])
return (
\<svg\>
\<path
d=\{[
"M", range[0], 6,
"v", -6,
"H", range[1],
"v", 6,
].join(" ")\}
fill="none"
stroke="currentColor"
/\>
\{ticks.map((\{ value, xOffset \}) =\> (
\<g
key=\{value\}
transform=\{`translate(${xOffset}, 0)`\}
\>
\<line
y2="6"
stroke="currentColor"
/\>
\<text
key=\{value\}
style=\{\{
fontSize: "10px",
textAnchor: "middle",
transform: "translateY(20px)"
\}\}\>
\{ value \}
\</text\>
\</g\>
))\}
\</svg\>
)
\}
Our Axis component will take two props: domain and range.
Try updating the props values:
domain:
[,]
range:
[,]
0102030405060708090
100

- 1.we check the range to dynamically change the number of ticks that we're aiming for (which we can set by passing the number to .ticks()).Note that .ticks() will aim for the passed number of ticks, but will also defer to friendlier, round numbers. For example, you could pass 10 but end up with 12 ticks.We're aiming for one tick per 30 pixels, with a minimum of 1.
- 2.we want to re-calculate our ticks when our props change. We want to pay attention to the **values** of our domain and range arrays, instead of the array reference, so we'll .join() them into a string.For example, we want to check a string of "0-100" instead of a **reference** to the array [0, 100].This will give us the ability to create the domain and range arrays within Axis's parent component.
- 3.a small change, but potentially important. We'll add a duplicate _first_ and _last_ tick mark, in case our ticks don't cover the top or bottom of our domain.For example, [0, 100] and [10, 150](click to update example)

Now, our Axis component really only works for axes at the bottom of a chart, at the moment. But hopefully this gives you enough of an idea of how easy it is to duplicate d3's axis drawing methods.
For a full example that covers all axis orientations, check out [Fullstack D3 and Data Visualization](https://www.newline.co/fullstack-d3)
I use this method for recreating any d3 methods that create multiple elements. In addition to the usual benefits of using React to render elements (**declarative** and **less hacky**), I find that this code is easier for other developers who are less familiar with the d3 API to understand the code.
We truly get the best of both worlds, since the d3 API surfaces many of its internal methods.
# ****Sizing & Responsivity
Sizing charts can be tricky! Because we need to exactly position our data elements, we can't use our usual web development tricks that rely on responsive sizing of \<div\>s and \<spans\>.
If you've read through many d3.js examples, you'll know that there's a common way of sizing charts. This is the terminology I use in [Fullstack D3 and Data Visualization](https://www.newline.co/fullstack-d3):
top
right
bottom
left

- **wrapper******is the extent of the chart, and the dimensions of the \<svg\> element
- **bounds******contain the data elements, but exclude margins and legends
    - **margins******determine the padding around the **bounds**

We need to separate our **wrapper** and **bounds** boxes because we need to know their exact dimensions when building a chart with \<svg\>.
ChartWithDimensions.jsx
const chartSettings = \{
"marginLeft": 75
\}
const ChartWithDimensions = () =\> \{
const [ref, dms] = useChartDimensions(chartSettings)
const xScale = useMemo(() =\> (
d3.scaleLinear()
.domain([0, 100])
.range([0, dms.boundedWidth])
), [dms.boundedWidth])
return (
\<div
className="Chart__wrapper"
ref=\{ref\}
style=\{\{ height: "200px" \}\}\>
\<svg width=\{dms.width\} height=\{dms.height\}\>
\<g transform=\{`translate($\{[
dms.marginLeft,
dms.marginTop
].join(",")\})`\}\>
\<rect
width=\{dms.boundedWidth\}
height=\{dms.boundedHeight\}
fill="lavender"
/\>
\<g transform=\{`translate($\{[
0,
dms.boundedHeight,
].join(",")\})`\}\>
\<Axis
domain=\{xScale.domain()\}
range=\{xScale.range()\}
/\>
\</g\>
\</g\>
\</svg\>
\</div\>
)
\}
Try updating the chartSettings values:
width:
—
height:
—
marginTop:
—
marginRight:
—
marginBottom:
—
marginLeft:
75
05101520253035404550556065707580859095
100

- 1.use a custom hook to calculate the dimensions of our **wrapper** and **bounds** (more on this in a bit)Not very familiar with React Hooks? Read more in [Thinking in React Hooks](https://wattenberger.com/blog/react-hooks).
- 2.use the dms object with the calculated dimensions to create an x scale
- 3.use the React ref from our custom hook to pass a _non-svg_ wrapping element that _is the size we want our_ **wrapper** _to be_
- 4.transform the main part of our chart to respect our **top** and **left** **margins**

Now that we have an idea of how we would use **wrapper**, **bounds**, and **margins**, let's look at what our custom hook is doing.
useChartDimensions.js
import ResizeObserver from '@juggle/resize-observer'
const useChartDimensions = passedSettings =\> \{
const ref = useRef()
const dimensions = combineChartDimensions(
passedSettings
)
const [width, setWidth] = useState(0)
const [height, setHeight] = useState(0)
useEffect(() =\> \{
if (dimensions.width && dimensions.height)
return [ref, dimensions]
const element = ref.current
const resizeObserver = new ResizeObserver(
entries =\> \{
if (!Array.isArray(entries)) return
if (!entries.length) return
const entry = entries[0]
if (width != entry.contentRect.width)
setWidth(entry.contentRect.width)
if (height != entry.contentRect.height)
setHeight(entry.contentRect.height)
\}
)
resizeObserver.observe(element)
return () =\> resizeObserver.unobserve(element)
\}, [])
const newSettings = combineChartDimensions(\{
...dimensions,
width: dimensions.width || width,
height: dimensions.height || height,
\})
return [ref, newSettings]
\}

- 1.fill in missing **margins** with preset default values.
- 2.defer to the passed height and width, if specified in the passedSettings
- 3.use a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to re-calculate the dimensions when the passed element changes sizeResizeObserver is [currently not supported in all browsers](https://caniuse.com/#feat=resizeobserver), so we're using [this resize-observer](https://www.npmjs.com/package/@juggle/resize-observer) polyfill to make sure this works in all browsers.
- 4.grab the **height** and **width** of a containing \<div\> for our **wrapper** dimensions
- 5.calculate the dimensions of our **bounds** (named boundedHeight and boundedWidth)

Note that any settings that we don't set are being filled in automatically. For example, we can specify a specific height, or let useChartDimensions grab the value from the wrapping element, using the React ref.
Hopefully this gives you an idea of how to handle chart dimensions in a responsive, easy way. Feel free to grab my custom useChartDimensions hook — I really enjoy having my **wrapper**, **bounds**, and **margins** calculated, with a simple one-liner.
# ****Maps
So you've seen awesome examples of people using d3 to create detailed maps, and globes that you can spin around. And you want to do that, too.
Worry not! We can let d3 do a lot of the heavy lifting, and have a map in no time! First, let's look at our map! Try changing the projection, d3 comes with tons of fun options:
To play with all of the projections built in to d3, check them out [in this blog post about d3](https://wattenberger.com/blog/d3#maps-and-globes).
Map.jsx
const Map = (\{ projectionName = "geoArmadillo" \}) =\> \{
// grab our custom React hook we defined above
const [ref, dms] = useChartDimensions(\{\})
// this is the definition for the whole Earth
const sphere = \{ type: "Sphere" \}
const projectionFunction = d3[projectionName]
|| d3GeoProjection[projectionName]
const projection = projectionFunction()
.fitWidth(dms.width, sphere)
const pathGenerator = d3.geoPath(projection)
// size the svg to fit the height of the map
const [
[x0, y0],
[x1, y1]
] = pathGenerator.bounds(sphere)
const height = y1
return (
\<div
ref=\{ref\}
style=\{\{
width: "100%",
\}\}
\>
\<svg width=\{dms.width\} height=\{height\}\>
\<defs\>
\{/* some projections bleed outside the edges of the Earth's sphere */\}
\{/* let's create a clip path to keep things in bounds */\}
\<clipPath id="Map__sphere"\>
\<path d=\{pathGenerator(sphere)\} /\>
\</clipPath\>
\</defs\>
\<path
d=\{pathGenerator(sphere)\}
fill="#f2f2f7"
/\>
\<g style=\{\{ clipPath: "url(#Map__sphere)" \}\}\>
\{/* we can even have graticules! */\}
\<path
d=\{pathGenerator(d3.geoGraticule10())\}
fill="none"
stroke="#fff"
/\>
\{countryShapes.features.map((shape) =\> \{
return (
\<path
key=\{shape.properties.subunit\}
d=\{pathGenerator(shape)\}
fill="#9980FA"
stroke="#fff"
\>
\<title\>
\{shape.properties.name\}
\</title\>
\</path\>
)
\})\}
\</g\>
\</svg\>
\</div\>
)
\}

- 1.First, we need to create a projection. This is our map between our country shape definitions and the way we draw those 3D shapes on our 2D screen.We'll use the [.fitWidth()](https://github.com/d3/d3-geo#projection_fitWidth) method to size our map within the width of our component, and also create a pathGenerator to generate path definitions for our Earth & country shapes using [d3.geoPath()](https://github.com/d3/d3-geo#geoPath).
- 2.Next, we'll find the dimensions of the whole Earth (sphere) in our projection, and assign the height of our svg to the height of the sphere.
- 3.Some projections' shapes bleed outside of the edges of the Earth, so we'll keep them in bounds using a clipPath.
- 4.We can use our pathGenerator function to turn [GeoJSON](https://macwright.com/2015/03/23/geojson-second-bite.html)shape definitions into \<path\> d attribute strings. First, we'll draw the whole Earth in a light gray.
- 5.**d3-geo** has some great methods, like [d3.geoGraticule10()](https://github.com/d3/d3-geo#geoGraticule10) which will help us draw graticule lines for reference.
- 6.Last but not least, we'll draw our country shapes! We can draw different types of geographic shapes by passing GeoJSON definitions to our pathGenerator function. For example, we're importing [a list of country definitions](https://github.com/Wattenberger/Wattenberger-2019/tree/master/src/components/Blog/posts/D3AndReact/countries.json), then creating \<path\> elements with their shape.

Once you get the basics down, this is a really flexible way to draw geography! The trick is to think of d3 as a series of tools.
I'll usually draw maps using Canvas, since rendering lots of SVG elements can get slow, and maps often have tons of shapes.

If you want an example of Canvas rendering, as well as drawing bubbles on top of countries to visualize a metric, check out this [Svelte recipe](https://svelte.recipes/components/world-map). The code is in Svelte.js, but most of it will translate to React! Especially the drawCanvas function.
# ****Complex visualization layouts
We're through with the basics! We've covered:

- how to draw svg elements
- how to draw _many_ svg elements
- how to replicate built-in d3 methods for drawing complex elements like axes
- how to size our charts easily
    - how to draw maps!

From me experience, the most important rule is to _know your tools_. Once you're comfortable with drawing with SVG, using d3 as a utility library, and building React.js code, you'll truly be able to make whatever you can imagine. This is the beauty of learning the fundamentals, instead of just grabbing a chart library -- it's a lot more work to learn, but is way more powerful.
For inspiration, here are some more custom visualizations I've put together:

[](https://wattenberger.com/fishing)

[Playing around with international fishing data](https://wattenberger.com/fishing)

[](https://2019.stateofjs.com/overview/)

[A custom viz for The State of JS 2019 showing how usage & opinion of different Javascript tools has changed over the years](https://2019.stateofjs.com/overview/)

[](https://js-tools.netlify.app/)

[Looking at co-usage between Javascript tools with The State of JS 2019 data](https://js-tools.netlify.app/)

[](https://loa.mit.edu/#/Database)

[An animated visualization of missions to the moon, showing interesting metrics like the type of mission, the organization, and whether or not it was successful](https://loa.mit.edu/#/Database)
My favorite parts of the data visualization field are:

- how many forms we haven't yet explored,
- how simple sharing can be, and
    - the impact they can have, especially when interactable

And we get the best of all worlds when creating custom, interactive visualizations on the web.
If you found this article useful, I'd love to hear what you make [on Twitter](https://twitter.com/wattenberger)!
 \> 来自 \<[https://wattenberger.com/blog/react-and-d3](https://wattenberger.com/blog/react-and-d3)\>

Our component does a few new things:
But this is quite a lot of code to draw a single shape, isn't it? And aren't we supposed to use React **ref**s as sparingly as possible?
Avoid using refs for anything that can be done declaratively.
[the React docs](https://reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs)
This code looks very similar to our previous code, with two changes:

Much clearer! In this code, we're...

**Don't feel the need to run through all of it** -- the gist is that we have 6 \<circle\>s, and every two seconds, we randomly choose some of them to show up.
In this code, we:
So easy! All we need to do to create a bottom axis is:
While we don't want to use a d3 method that creates DOM elements (.axisBottom()), we _can_ use the d3 methods that d3 uses internally to create axes!
We really didn't have to make many changes here! Let's look at the main updates:
This example is a little complicated - let's walk through what's going on. The main parts to pay attention to here are where we...
When we pass a settings object to our custom useChartDimensions hook, it will...
There's a good amount of code in here, but really not much to create a whole map! Let's run through the highlights:
  [](https://wattenberger.com/fishing)[](https://2019.stateofjs.com/overview/)[](https://js-tools.netlify.app/)[](https://loa.mit.edu/#/Database)
\> 来自 \<[https://wattenberger.com/blog/react-and-d3](https://wattenberger.com/blog/react-and-d3)\>

:::
