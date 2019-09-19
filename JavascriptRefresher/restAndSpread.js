const array = ['first', 'second', 'third'];

const copiedArray = [...array] // spread operator removes items from the og array and pass it to the copied array

//toArray without rest operator
const toArray = (a1, a2, a3) => {
    return [a1, a2, a3];
}

//toArray with rest operator, much more flexible
const toArrayRest = (...args) => args;

console.log(toArrayRest(1, 2, 3, 4, 5, 6, 7, 8))
