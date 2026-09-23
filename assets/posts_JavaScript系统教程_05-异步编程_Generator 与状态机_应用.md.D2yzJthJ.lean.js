import{_ as s,o as a,c as t,j as n,a as e}from"./chunks/framework.DJo0M80U.js";const v=JSON.parse('{"title":"应用","description":"\\\\ 来自。","frontmatter":{"title":"应用","date":"2026-08-11T00:00:00.000Z","categories":["JavaScript 系统教程"],"tags":["JavaScript","前端","教程","OneNote","异步编程"],"description":"\\\\ 来自。","sidebarWeight":8,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/b-原生js/11-异步编程/Generator 与状态机/应用.md"},"headers":[],"relativePath":"posts/JavaScript系统教程/05-异步编程/Generator 与状态机/应用.md","filePath":"posts/JavaScript系统教程/05-异步编程/Generator 与状态机/应用.md"}'),i={name:"posts/JavaScript系统教程/05-异步编程/Generator 与状态机/应用.md"};function r(o,l,p,u,c,d){return a(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"应用",tabindex:"-1"},[e("应用 "),n("a",{class:"header-anchor",href:"#应用","aria-label":'Permalink to "应用"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“应用”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。")]),e(`
`),n("span",{class:"line"},[n("span",null,"**（****1****）异步操作的同步化表达**")]),e(`
`),n("span",{class:"line"},[n("span",null,"Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* loadUI() {  showLoadingScreen();  yield loadUIDataAsynchronously();  hideLoadingScreen();}var loader = loadUI();// 加载UIloader.next()")]),e(`
`),n("span",{class:"line"},[n("span",null,"// 卸载UIloader.next()")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。下一次对该遍历器调用next方法，则会显示Loading界面（showLoadingScreen），并且异步加载数据（loadUIDataAsynchronously）。等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数，按部就班非常清晰。")]),e(`
`),n("span",{class:"line"},[n("span",null,"Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。")]),e(`
`),n("span",{class:"line"},[n("span",null,'function* main() {  var result = yield request("http://some.url");  var resp = JSON.parse(result);    console.log(resp.value);}')]),e(`
`),n("span",{class:"line"},[n("span",null,"function request(url) {  makeAjaxCall(url, function(response){    it.next(response);  });}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var it = main();it.next();")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码的main函数，就是通过 Ajax 操作获取数据。可以看到，除了多了一个yield，它几乎与同步操作的写法完全一样。注意，makeAjaxCall函数中的next方法，必须加上response参数，因为yield表达式，本身是没有值的，总是等于undefined。")]),e(`
`),n("span",{class:"line"},[n("span",null,"下面是另一个例子，通过 Generator 函数逐行读取文本文件。")]),e(`
`),n("span",{class:"line"},[n("span",null,'function* numbers() {  let file = new FileReader("numbers.txt");  try {    while(!file.eof) {      yield parseInt(file.readLine(), 10);    }  } finally {    file.close();  }}')]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码打开文本文件，使用yield表达式可以手动逐行读取文件。")]),e(`
`),n("span",{class:"line"},[n("span",null,"**（****2****）控制流管理**")]),e(`
`),n("span",{class:"line"},[n("span",null,"如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。")]),e(`
`),n("span",{class:"line"},[n("span",null,"step1(function (value1) {  step2(value1, function(value2) {    step3(value2, function(value3) {      step4(value3, function(value4) {        // Do something with value4      });    });  });});")]),e(`
`),n("span",{class:"line"},[n("span",null,"采用 Promise 改写上面的代码。")]),e(`
`),n("span",{class:"line"},[n("span",null,"Promise.resolve(step1)  .then(step2)  .then(step3)  .then(step4)  .then(function (value4) {    // Do something with value4  }, function (error) {    // Handle any error from step1 through step4  })  .done();")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* longRunningTask(value1) {  try {    var value2 = yield step1(value1);    var value3 = yield step2(value2);    var value4 = yield step3(value3);    var value5 = yield step4(value4);    // Do something with value4  } catch (e) {    // Handle any error from step1 through step4  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"然后，使用一个函数，按次序自动执行所有步骤。")]),e(`
`),n("span",{class:"line"},[n("span",null,"scheduler(longRunningTask(initialValue));")]),e(`
`),n("span",{class:"line"},[n("span",null,"function scheduler(task) {  var taskObj = task.next(task.value); // 如果Generator函数未结束，就继续调用  if (!taskObj.done) {    task.value = taskObj.value    scheduler(task);  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"注意，上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。")]),e(`
`),n("span",{class:"line"},[n("span",null,"下面，利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"let steps = [step1Func, step2Func, step3Func];")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* iterateSteps(steps){  for (var i=0; i< steps.length; i++){    var step = steps[i];    yield step();  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，数组steps封装了一个任务的多个步骤，Generator 函数iterateSteps则是依次为这些步骤加上yield命令。")]),e(`
`),n("span",{class:"line"},[n("span",null,"将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。")]),e(`
`),n("span",{class:"line"},[n("span",null,"let jobs = [job1, job2, job3];")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* iterateJobs(jobs){  for (var i=0; i< jobs.length; i++){    var job = jobs[i];    yield* iterateSteps(job.steps);  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码中，数组jobs封装了一个项目的多个任务，Generator 函数iterateJobs则是依次为这些任务加上yield*命令。")]),e(`
`),n("span",{class:"line"},[n("span",null,"最后，就可以用for...of循环一次性依次执行所有任务的所有步骤。")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (var step of iterateJobs(jobs)){  console.log(step.id);}")]),e(`
`),n("span",{class:"line"},[n("span",null,"再次提醒，上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤。如果想要依次执行异步的步骤，必须使用后面的《异步操作》一章介绍的方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"for...of的本质是一个while循环，所以上面的代码实质上执行的是下面的逻辑。")]),e(`
`),n("span",{class:"line"},[n("span",null,"var it = iterateJobs(jobs);var res = it.next();")]),e(`
`),n("span",{class:"line"},[n("span",null,"while (!res.done){  var result = res.value;  // ...  res = it.next();}")]),e(`
`),n("span",{class:"line"},[n("span",null,"**（****3****）部署** **Iterator** **接口**")]),e(`
`),n("span",{class:"line"},[n("span",null,"利用 Generator 函数，可以在任意对象上部署 Iterator 接口。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* iterEntries(obj) {  let keys = Object.keys(obj);  for (let i=0; i < keys.length; i++) {    let key = keys[i];    yield [key, obj[key]];  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"let myObj = { foo: 3, bar: 7 };")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (let [key, value] of iterEntries(myObj)) {  console.log(key, value);}")]),e(`
`),n("span",{class:"line"},[n("span",null,"// foo 3// bar 7")]),e(`
`),n("span",{class:"line"},[n("span",null,"上述代码中，myObj是一个普通对象，通过iterEntries函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署next方法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* makeSimpleGenerator(array){  var nextIndex = 0;")]),e(`
`),n("span",{class:"line"},[n("span",null,"while(nextIndex < array.length){    yield array[nextIndex++];  }}")]),e(`
`),n("span",{class:"line"},[n("span",null,"var gen = makeSimpleGenerator(['yo', 'ya']);")]),e(`
`),n("span",{class:"line"},[n("span",null,"gen.next().value // 'yo'gen.next().value // 'ya'gen.next().done  // true")]),e(`
`),n("span",{class:"line"},[n("span",null,"**（****4****）作为数据结构**")]),e(`
`),n("span",{class:"line"},[n("span",null,"Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function* doStuff() {  yield fs.readFile.bind(null, 'hello.txt');  yield fs.readFile.bind(null, 'world.txt');  yield fs.readFile.bind(null, 'and-such.txt');}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。")]),e(`
`),n("span",{class:"line"},[n("span",null,"for (task of doStuff()) {  // task是一个函数，可以像回调函数那样使用它}")]),e(`
`),n("span",{class:"line"},[n("span",null,"实际上，如果用 ES5 表达，完全可以用数组模拟 Generator 的这种用法。")]),e(`
`),n("span",{class:"line"},[n("span",null,"function doStuff() {  return [    fs.readFile.bind(null, 'hello.txt'),    fs.readFile.bind(null, 'world.txt'),    fs.readFile.bind(null, 'and-such.txt')  ];}")]),e(`
`),n("span",{class:"line"},[n("span",null,"上面的函数，可以用一模一样的for...of循环处理！两相一比较，就不难看出 Generator 使得数据或者操作，具备了类似数组的接口。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://es6.ruanyifeng.com/#docs/generator>")])])])])],-1)])])}const h=s(i,[["render",r]]);export{v as __pageData,h as default};
