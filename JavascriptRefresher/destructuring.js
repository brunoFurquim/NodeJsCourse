const exampleObject = {
    id: 1,
    size: 10
}

//Without destructuring
const printId = (object) => console.log(object.id);

const printIdDestruct = ({ id }) => console.log(id);

printId(exampleObject);
printIdDestruct(exampleObject);