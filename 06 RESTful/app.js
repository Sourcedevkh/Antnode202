const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
/* Use express.json() middleware for handle json Object covert to JavaScript objects */
app.use(express.json());



let products = [
    {id: 1, name: 'Product 1', price: 10.99, description: 'This is product 1'},
    {id: 2, name: 'Product 2', price: 19.99, description: 'This is product 2'},
    {id: 3, name: 'Product 3', price: 5.99, description: 'This is product 3'}
]
let ids = 3;

app.get('/products', (req, res) =>{
    res.json({
        success: true,
        msg: 'fetch all products',
        data: products
    })
});

app.post('/products', (req, res) =>{
    console.log(req.body);
    const {id, name, price, description} = req.body;
    ids++;
    const newProduct ={
        id: ids,
        name,
        price,
        description
    }
    products.push(newProduct);
    res.json({
        success: true,
        msg: 'product created successfully',
        data: newProduct
    })  
})

app.put('/products/:id', (req, res) =>{
    // console.log(req.params.id);
    let product = products.find(p => p.id === Number(req.params.id));
    console.log(product);
    if(!product){
        return res.json({
            success: false,
            msg: 'Product not found'
        })
    }
    const {name, price, description} = req.body;
    product.name = name;
    product.price = price;
    product.description = description;
    res.json({
        success: true,
        msg: 'product updated successfully',
        data: product
    })
    
})

app.delete('/products/:id', (req, res) =>{
    let product = products.findIndex(p => p.id === Number(req.params.id));
    // console.log(product);
    if(product === -1){
        return res.json({
            success: false,
            msg: 'Product not found'
        })
    }
    products.splice(product, 1);
    res.json({
        success: true,
        msg: 'Product deleted successfully',
    })
});

app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    if(!product){
        return res.json({
            success: false,
            msg: 'Product not found'
        })
    }
    res.json({
        success: true,
        msg: 'Product found',
        data: product
    })  
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})