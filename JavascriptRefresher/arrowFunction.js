const exampleFunction = () => {
    return "Return example";
};

const exampleFunction2 = (a, b) => a + b;

const exampleFunction3 = a => a + exampleFunction2(a, 2);

console.log(exampleFunction(), exampleFunction2(1, 2), exampleFunction3(1));

//Inside arrow functions, the "this" keyword refers to the global scope of the program, not the function scope.
