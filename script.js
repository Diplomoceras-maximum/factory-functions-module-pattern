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
