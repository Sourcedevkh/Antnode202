// const app = require("./app");
// console.log(app.i, app.name);

// const {i, name} = require("./app"); // Destructuring
// console.log(name, i);


const { log } = require("console");
const {sum, sub, arrays} = require("./app");
const os = require("os"); // Built-in module


// console.log("Sum:", sum(5, 10));
// console.log("Sub:", sub(10, 5));


// for(let i = 0; i< arrays.length; i++){
//     console.log(arrays[i]);
// }
console.log(os.platform());
console.log(os.version());

