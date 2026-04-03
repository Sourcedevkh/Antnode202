// let i = 5;
// var Username = "Pheara";
//  let app = 10;
// console.log(i);
// console.log(Username);
// console.log(app);

// console.log(global);


// let counter = 0;
// let interval = setInterval(() =>{
//     console.log("Hello World");
//     counter+=1;
//     if(counter === 5){
//         clearInterval(interval);
//     }
// },1000);

// console.log(__dirname);
// console.log(__filename);


// let i = 5;
// var name = "Pheara";

// module.exports = { i, name};


// function sum(a, b) {
//     return a + b;
// }

// function sub(a, b){
//     return a - b;
// }

// const sum = (a,b) => a + b;
// const sub = (a,b) => a - b;

// const arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// module.exports = {sum, sub, arrays}; // User defined module export


const fs = require('fs');


// fs.readFile('./texts.txt', 'UTF-8', (err, data) =>{
//     if(err) return console.log(err); 
//     console.log(data);
//     const newData = data;
// })

// fs.appendFile('./texts.txt', ' The world', (err) =>{
//     if(err) return console.log(err);
//     console.log("File has been written");
//     fs.readFile('./texts.txt', 'UTF-8', (err, data) =>{
//     if(err) return console.log(err); 
//     console.log(data);
//     })
// })

// fs.rm('./texts.txt', (err) =>{
//     if(err) return console.log(err);
//     console.log("File has been removed");
// })


// fs.unlink('./texts.txt', (err) =>{
//     if(err) return console.log(err);
//     console.log("File has been removed");
// })


// if(fs.existsSync('./b.txt')){
//     fs.unlink('./b.txt', (err) =>{
//     if(err) return console.log(err);
//     console.log("File has been removed");
// })
// }else{
//     console.log("File does not exist");
// }

// fs.mkdir('./assets', (err) =>{
//     if(err) return;
//     console.log('Create folder success');  
// })


// fs.rmdir('./assets', { recursive: true }, (err) =>{
//     if(err) return;
//     console.log('Remove folder success');  
// })

// if (fs.existsSync('./MyFolder')) {
//     fs.rm('./MyFolder', { recursive: true }, (err) => {
//         if (err) return console.log(err);
//         console.log('Remove folder success');
//     })
// } else {
//     fs.mkdir('./MyFolder', (err) => {
//         if (err) {
//             return console.log('Error creating folder');
//         } else {
//             console.log('Create folder success');
//             fs.writeFile('./MyFolder/texts.txt', 'Hello World', (err) => {
//                 if (err) return console.log('Error create file');
//                 console.log('File created successfully');
//             })
//         }
//     })
// }

fs.mkdir('./MyFolder', { recursive: true }, (err) => {
    if (err) return console.log(err);
    console.log('Create folder success');
    fs.writeFile('./MyFolder/texts.txt', 'Hello World', (err) => {
        if (err) return console.log('Error create file');
        console.log('File created successfully');
    })
})
fs.existsSync('./MyFolder') && fs.rm('./MyFolder', { recursive: true }, (err) => {
    if (err) return console.log(err);
    console.log('Remove folder success');
})