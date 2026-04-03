const express = require('express');
const axios = require('axios');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const PORT = 3000;


// app.get('/', (req, res) =>{
//     res.sendFile(__dirname + '/view/index.html');
// })

// app.get('/contact', (req, res) =>{
//     res.sendFile('./view/contact.html', {root: __dirname});

// })

// app.use(cors());

// app.get('/', async (req, res) =>{
//     const result = await axios.get('https://fakestoreapi.com/products');
//     console.log(result.data);
//     // return;
//     res.json({
//         result: true,
//         msg: 'Get all successfully',
//         data: result.data
//     })
// })


const startInterval = setInterval(() =>{
    const randomNumber = _.random(1, 10);
    console.log(randomNumber);
    if(randomNumber === 10){
        console.log('Stop', randomNumber);
        clearInterval(startInterval);
    }
}, 3000);




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})