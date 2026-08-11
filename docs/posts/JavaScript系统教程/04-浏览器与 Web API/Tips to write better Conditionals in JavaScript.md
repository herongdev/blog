---
title: "Tips to write better Conditionals in JavaScript"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "Oct 2 Updated on Oct 22, 2019 ・ 9 min read 1. 2. 3. 4. 5. 6. OR Array.includes animals variable out of the scope of this function to reuse i。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/Tips to write better Conditionals in JavaScript.md"
---
::: v-pre

# Tips to write better Conditionals in JavaScript

> 本节目标：理解“Tips to write better Conditionals in JavaScript”的核心思路，并能把它用于实际开发或面试表达。
```
Meggie
```

   `Oct 2` `Updated on` `Oct 22, 2019` ・`9 min read`

```
#javascript
```

```
#webdev
```

```
#beginners
```

```
#codenewbie
Table of Contents
```

1. ```
    Array.includes
    ```

2. ```
    Early exit / Return early
    ```

3. ```
    Object Literal or Map instead of Switch Statement
    ```

4. ```
    Default Parameters and Destructuring
    ```

5. ```
    Match all/partial criteria using Array.every & Array.some
    ```

6. ```
    Use Optional Chaining and Nullish Coalescing
    ```

```
1. Array.includes
For multiple conditions use
```

```
Array.includes
For example:
```

```
function printAnimals(animal) {   if (animal === 'dog' || animal === 'cat') {      console.log(`I have a ${animal}`);    }   }
console.log(printAnimals('dog')); // I have a dog
The above code looks good since we have only two animals to check. However, we're not sure of user input. What if, we get any other animal? If we will keep extending the statement with more
```

 `OR`

```
statements, the code will get harder to maintain, and not that clean.
Solution:
We can rewrite the conditional above by using
```

 `Array.includes`

```
function printAnimals(animal) {   const animals = ['dog', 'cat', 'hamster', 'turtle'];
if (animals.includes(animal)) {     console.log(`I have a ${animal}`);   }
}
console.log(printAnimals('hamster')); // I have a hamster
```

```
Here, we have created an array of animals so that the conditions are extracted separately from the rest part of the code. Now, if we want to do a check for any other animal, all we need to do is add a new array item.
We can also use the
```

 `animals` `variable out of the scope of this function to reuse it anywhere else in the code. This is a way to write cleaner code which is easier to understand and maintain. Isn't it?`

```
2. Early exit / Return early
This is a very cool trick to condense your code and make it look cleaner. I remember when I started working professionally, I learned to write conditionals with
```

 `early exit`

```
on my first day.
Let's take the previous example and add some more conditions. What if instead of the animal as a simple
```

 `string, it's an` `object`

```
with certain properties.
So now the requirements are:
```

- `If no animal, throw an error`
- `Print the type of animal`
- `Print the name of the animal`
- `Print the gender of the animal`

```
const printAnimalDetails = animal => {  let result; // declare a variable to store the final value
// condition 1: check if animal has a value  if (animal) {
// condition 2: check if animal has a type property    if (animal.type) {
// condition 3: check if animal has a name property      if (animal.name) {
// condition 4: check if animal has a gender property        if (animal.gender) {          result = `${animal.name} is a ${animal.gender} ${animal.type};`;        } else {          result = "No animal gender";        }      } else {        result = "No animal name";      }    } else {      result = "No animal type";    }  } else {    result = "No animal";  }
return result;};
console.log(printAnimalDetails()); // 'No animal'
console.log(printAnimalDetails({ type: "dog", gender: "female" })); // 'No animal name'
console.log(printAnimalDetails({ type: "dog", name: "Lucy" })); // 'No animal gender'
console.log(  printAnimalDetails({ type: "dog", name: "Lucy", gender: "female" })); // 'Lucy is a female dog'
```

```
What do you think about the above code?
It works fine, but the code is long and difficult to maintain. One can waste some time figuring out where the closing brackets are if they don't use linting too.
```

😄 `Imagine what would happen if the code has more complex logic. A lot of` `if..else`

```
statements!
We can refactor the above function with ternary operators,
```

 `&&` `conditions, etc. but instead let's write more precise code by using multiple return statements.`

```
const printAnimalDetails = ({type, name, gender } = {}) => {  if(!type) return 'No animal type';  if(!name) return 'No animal name';  if(!gender) return 'No animal gender';
// Now in this line of code, we're sure that we have an animal with all //the three properties here.
return `${name} is a ${gender} ${type}`;}
console.log(printAnimalDetails()); // 'No animal type'
console.log(printAnimalDetails({ type: dog })); // 'No animal name'
console.log(printAnimalDetails({ type: dog, gender: female })); // 'No animal name'
console.log(printAnimalDetails({ type: dog, name: 'Lucy', gender: 'female' })); // 'Lucy is a female dog'
In the refactored version,
```

 `destructuring` `and` `default parameters` `is also included. The default parameter ensures that if we pass` `undefined` `as an argument to the method, we still have a value to destruct, here which is an empty object`

```
{}.
Usually, in the professional world, the code is written somewhere in-between these two approaches.
Another example:
```

```
function printVegetablesWithQuantity(vegetable, quantity) {  const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];
// condition 1: vegetable should be present   if (vegetable) {     // condition 2: must be one of the item from the list     if (vegetables.includes(vegetable)) {       console.log(`I like ${vegetable}`);
// condition 3: must be large quantity       if (quantity >= 10) {         console.log('I have bought a large quantity');       }     }   } else {     throw new Error('No vegetable from the list!');   } }
printVegetablesWithQuantity(null); //  No vegetable from the list! printVegetablesWithQuantity('cabbage'); // I like cabbage printVegetablesWithQuantity('cabbage', 20);  // 'I like cabbage` // 'I have bought a large quantity'
Now, we have:
```

- `1 if/else statement that filters the invalid condition`
- `3 levels of nested if statements (condition 1, 2 & 3)`

`A general rule to follow is` `return early when invalid conditions found.`

```
function printVegetablesWithQuantity(vegetable, quantity) {
const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];
// condition 1: throw error early   if (!vegetable) throw new Error('No vegetable from the list!');
// condition 2: must be in the list   if (vegetables.includes(vegetable)) {      console.log(`I like ${vegetable}`);
// condition 3: must be a large quantity      if (quantity >= 10) {        console.log('I have bought a large quantity');      }   } }
By doing this, we have one less level of the nested statement. This coding style is good especially when you have long if statement.
We can further reduce the nesting
```

 `ifs, by inverting the conditions & return early. Look at condition 2 below to see how we do it:`

```
function printVegetablesWithQuantity(vegetable, quantity) {
const vegetables = ['potato', 'cabbage', 'cauliflower', 'asparagus'];
if (!vegetable) throw new Error('No vegetable from the list!');    // condition 1: throw error early
if (!vegetables.includes(vegetable)) return;    // condition 2: return from the function is the vegetable is not in   //  the list
console.log(`I like ${vegetable}`);
// condition 3: must be a large quantity  if (quantity >= 10) {      console.log('I have bought a large quantity');  } }
By inverting the conditions of condition 2, the code doesn't have a nested statement anymore. This technique is useful when we have lot of conditions and we want to stop the further process when any particular condition is not met.
Therefore, always aim for
```

 `Less Nesting` `and` `Return Early`

```
but don't overdo it.
3. Object Literal or Map instead of Switch Statement
Let's look at the example below, we want to print fruits based on color:
```

```
function printFruits(color) {  // use switch case to find fruits by color  switch (color) {    case 'red':      return ['apple', 'strawberry'];    case 'yellow':      return ['banana', 'pineapple'];    case 'purple':      return ['grape', 'plum'];    default:      return [];  }}
printFruits(null); // []printFruits('yellow'); // ['banana', 'pineapple']
The above code is not wrong, but it's still quite verbose. The same result can be achieved with
```

 `object literal` `with cleaner syntax:`

```
// use object literal to find fruits by color  const fruitColor = {    red: ['apple', 'strawberry'],    yellow: ['banana', 'pineapple'],    purple: ['grape', 'plum']  };
function printFruits(color) {  return fruitColor[color] || [];}
Alternatively, you may use
```

 `Map` `to achieve the same result:`

```
// use Map to find fruits by color  const fruitColor = new Map()    .set('red', ['apple', 'strawberry'])    .set('yellow', ['banana', 'pineapple'])    .set('purple', ['grape', 'plum']);
function printFruits(color) {  return fruitColor.get(color) || [];}
Map
```

 `is the object type available since ES2015, which allows storing the` `key-value`

```
pair.
For the example above, the same result can be achieved with
```

 `Array.filter` `as well.`

```
const fruits = [    { name: 'apple', color: 'red' },     { name: 'strawberry', color: 'red' },     { name: 'banana', color: 'yellow' },     { name: 'pineapple', color: 'yellow' },     { name: 'grape', color: 'purple' },     { name: 'plum', color: 'purple' }];
function printFruits(color) {  return fruits.filter(fruit => fruit.color === color);}
4. Default Parameters and Destructuring
While working with JavaScript, we always need to check for
```

 `null/undefinedvalue and assign` `default value, or the compilation breaks.`

```
function printVegetablesWithQuantity(vegetable, quantity = 1) { // if quantity has no value, assign 1
if (!vegetable) return;    console.log(`We have ${quantity} ${vegetable}!`);  }
//results  printVegetablesWithQuantity('cabbage'); // We have 1 cabbage!  printVegetablesWithQuantity('potato', 2); // We have 2 potato!
What if
```

 `vegetable` `is an object? Can we assign a default parameter?`

```
function printVegetableName(vegetable) {     if (vegetable && vegetable.name) {     console.log (vegetable.name);   } else {    console.log('unknown');   } }
printVegetableName(undefined); // unknown printVegetableName({}); // unknown printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
In the above example, we want to print the vegetable name if it's available or print
```

```
unknown.
We can avoid the conditional
```

 `if (vegetable && vegetable.name) {}` `by using default parameter & destructing.`

```
// destructing - get name property only  // assign default empty object {}
function printVegetableName({name} = {}) {   console.log (name || 'unknown'); }
printVegetableName(undefined); // unknown printVegetableName({ }); // unknown printVegetableName({ name: 'cabbage', quantity: 2 }); // cabbage
Since we only need property
```

 `name, we can destructure the parameter using` `{ name }, then we can use` `name` `as a variable in our code instead of`

```
vegetable.name.
We also assign an empty object {} as a default value, otherwise it gives will an error when executing the line
```

 `printVegetableName(undefined)` `-` `Cannot destructure property name of undefined or null, because there is no name property in`

```
undefined.
5. Match all/partial criteria using Array.every & Array.some
We can reduce the lines of code by using these array methods. Look at the code below, we want to check if all fruits are red in color:
```

```
const fruits = [    { name: 'apple', color: 'red' },    { name: 'banana', color: 'yellow' },    { name: 'grape', color: 'purple' }  ];
function test() {  let isAllRed = true;
// condition: all fruits must be red  for (let f of fruits) {    if (!isAllRed) break;    isAllRed = (f.color == 'red');  }
console.log(isAllRed); // false}
The code is so long! We can reduce the number of lines with
```

 `Array.every:`

```
const fruits = [    { name: 'apple', color: 'red' },    { name: 'banana', color: 'yellow' },    { name: 'grape', color: 'purple' }  ];
function test() {  // condition: short way, all fruits must be red  const isAllRed = fruits.every(f => f.color == 'red');
console.log(isAllRed); // false}
In a similar way, if we want to test if any of the fruit is red, we can use Array.some to achieve it in one line.
```

```
const fruits = [    { name: 'apple', color: 'red' },    { name: 'banana', color: 'yellow' },    { name: 'grape', color: 'purple' }];
function test() {  // condition: if any fruit is red  const isAnyRed = fruits.some(f => f.color == 'red');
console.log(isAnyRed); // true}
6. Use Optional Chaining and Nullish Coalescing
These two functionalities are going to be a very useful addition to JavaScript for writing cleaner conditionals. They are not fully supported at the time of writing this, and you need to use Babel for compilation.
Optional chaining
```

 `enables us to handle tree-like structures without explicitly checking if the intermediate nodes exist, and` `nullish coalescing`

```
works great in combination with optional chaining to ensure the default value for an unexisting one.
Here's an example:
```

```
const car = {    model: 'Fiesta',    manufacturer: {    name: 'Ford',    address: {      street: 'Some Street Name',      number: '5555',      state: 'USA'      }    }  }
// to get the car model  const model = car && car.model || 'default model';
// to get the manufacturer street  const street = car && car.manufacturer && car.manufacturer.address &&   car.manufacturer.address.street || 'default street';
// request an un-existing property  const phoneNumber = car && car.manufacturer && car.manufacturer.address   && car.manufacturer.phoneNumber;
console.log(model) // 'Fiesta'  console.log(street) // 'Some Street Name'  console.log(phoneNumber) // undefined
So, if we wanted to print out if the car manufacturer is from the USA, the code would look something like this:
```

```
const isManufacturerFromUSA = () => {   if(car && car.manufacturer && car.manufacturer.address &&  car.manufacturer.address.state === 'USA') {     console.log('true');   } }
checkCarManufacturerState() // 'true'
You can see clearly how messy this can become in case of a more complex object structure. There are some third-party libraries, like
```

 `lodash` `or` `idxwhich have their own functions. For example lodash has` `_.get`

```
method. However, it's super cool to have this feature introduced in JavaScript language itself.
Here's how these new features work:
```

```
// to get the car model const model = car?.model ?? 'default model';
// to get the manufacturer street const street = car?.manufacturer?.address?.street ?? 'default street';
// to check if the car manufacturer is from the USA const isManufacturerFromUSA = () => {   if(car?.manufacturer?.address?.state === 'USA') {     console.log('true');   } }
This looks a lot prettier and easier to maintain. It's already in
```

 `TC39 stage 3, let's wait for it to get approved and then we can see the use of this incredible syntax everywhere.`

```
Summary
Let's learn and try new tips and techniques for writing more clean and maintainable code because, after a few months, long conditionals can be like shooting yourself in the foot.
```

😄

```
Edit: Added syntax highlighting.
Reference,
```

```
blog post
```

 `by Milos Protic` 😄
 \> 来自

```
 <https://dev.to/hellomeghna/tips-to-write-better-conditionals-in-javascript-2189>
```

:::
