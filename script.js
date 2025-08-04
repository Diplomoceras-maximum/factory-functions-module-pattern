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
