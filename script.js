/* There are other ways to organise code aside from object constructors, constructors also have flaws */

// ##################################################
//  Scoping
// ##################################################

// 1. Scoping refers to where certain variables are accessible, and indicates the current context of a variable
// 2. When a variable is not declared in a function, existing outside of curly braces "{}", it is in global scope, available everywhere
// 3. Variables inside curly braces, are locally scoped

// 4. Before ES6, JavaScript used a single keyword "var" to declare a variable
// 5. These variables can be redefined and updated, and defined within the function scope, meaning they are only available within the function they are declared in

// 6. In ES6, the keywords "let" and "const" were added. These allow you to define variables that are block scoped, meaning they are only available to the closest set of curly braces
// 7. These braces could be those of a for loop, if-else conditional, or anything similar, all these things are called a block, for example:

let globalAge = 23; // Global variable

// Function + curly braces which indicates a block
function printAge(age) {
  var varAge = 34; // Function scoped variable

  // curly brace = block
  if (age > 0) {
    // Block scoped variable inside the if block
    const constAge = age * 2;
    console.log(constAge);
  }

  // ERROR! cannot access a block scoped variable not within its scope
  console.log(constAge);
}

printAge(globalAge);

// ERROR! cannot access a function scoped variable outside the function its defined in
console.log(varAge);

// ##################################################
//  Closures
// ##################################################

// Example:

function makeAdding(firstNumber) {
  // "first" is scoped within the makeAdding function
  const first = firstNumber;
  return function resulting(secondNumber) {
    // "second" is scoped within the resulting function
    const second = secondNumber;
    return first + second;
  };
}

const add5 = makeAdding(5); // This is where the closure is created
console.log(add5(2)); // 7

// Summary:
// 1. The makeAdding function takes an argument, firstNumber, declares a constant first with the value of firstNumber, and returns another function
// 2. When an argument is passed to the returned function, which we have assigned to add5, it returns the result of adding up the number passed earlier to the number passed now (first to second)

// 3. The first variable is scoped within the makeAdding function
// 4. When the add5 variable is declared it is outside the makeAdding function
// 5. How does the first variable exist when passed as an argument to the add5 function, this is where closures come in

// === Closures ===

// 1. Functions in JavaScript form closures
// 2. A closure refers to the combination of a function and the surrounding state in which the function was declared
// 3. The surrounding state, also called the lexical environment, consists of any local variables that were in scope at the time the closure was made
// 4. From the example, add5 is a reference to the resulting function, created when the makeAdding function is executed, thus it has access to the lexical environemnt of the resulting function, which contains the first variable

// This is a crucial behavior of functions, allowing functions to associate and manipulate data anywhere outside of the enclosing function

// ##################################################
//  The problem with constructors
// ##################################################

// 1. The biggest problem with constructors is that they dont provide automatic safeguards that prevent them from being used wrong
// 2. They look like regular JS functions, but do not behave the same - they require the new keyword otherwise complicated errors will be produced that are hard to track down
// 3. Misuse of the instaceof is another issue. In JS it checks the presence of a constructor's prototype in a object's entire prototype chain - which does nothing to confirm if an object was made with that constructor since the prototype can even be reassigned after the creation of an object

// As a result of these issues, construcotrs have become unpopular in favor of a petter that is similar but address a lot of the issues of constructors, Factory Functions

// ##################################################
//  Factory functions
// ##################################################

// 1. These functions work similarly to constructors but with one difference, they use closures.
// 2. Instead of using the new keyword to create an object, facotry function set up and return the new object when you call the function, they do not use prototypes.

// Example:

// Constructor
// const User = function (name) {
//   this.name = name;
//   this.discordName = "@" + name;
// };

// Factory function
// function createUser(name) {
//   const discordName = "@" + name;
//   return { name, discordName };
// }

// They are very similar but factory funnction is just a function and therefore doesnt require a new keyword

// ##################################################
//  Private variables and functions
// ##################################################

// 1. On first look it appears that factories return an object, where is the closure?
// 2. This is where the User factory can be extended to add more variables and introduce "private" ones, for example:

function createUser(name) {
  const discordName = "@" + name;

  let reputation = 0;
  const getReputation = () => reputation;
  const giveReputation = () => reputation++;

  return { name, discordName, getReputation, giveReputation };
}

const john = createUser("john");
john.giveReputation();
john.giveReputation();

console.log({
  discordName: john.discordName,
  reputation: john.getReputation(),
}); // { discordName: "@john", reputation: 2 }

// Summary:
// 1. The object returned does not contain the reputation variable itself, or any copy of its value
// 2. Instead, the returned object contains two functions, on that reads the value of the reputation, and one that increases its value by one
// 3. The reputation variable is what we call a "private" variable, since it cnanot be accessed directly in the object instance, only by the closures that are defined

// === Benefits ===

// 1. A private variable or function uses closures to create smaller, dedicated variables and cuntion within a factory function itself, things that do not need to be returned in the object
// 2. This way the code can be neater with polluting the returned object with unnecessary variables
// 3. Often you do not need every single function within a factory to be returned with the object

// ##################################################
//  Prototypal inheritence with factories
// ##################################################

// 1. Factory functions can utilise inheritence too, for example:

function createPlayer(name, leveel) {
  const { getReputation, giveReputation } = createUser(name);

  const increaseLevel = () => level++;
  return { name, getReputation, giveReputation, increaseLevel };
}

// In this example you can create the User, extract what is needed from it, and re-return whatever is needed, hiding the rest as private variables or functions
// To extend it, you can use the Object.assign method to add properties, for example:

function createPlayer(name, level) {
  const user = createUser(name);

  const increaseLevel = () => level++;
  return Object.assign({}, user, { increaseLevel });
}
