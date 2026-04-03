const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
    // console.log("GET:", req.method);
    // console.log("URL", req.url);
    // console.log(res);
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Type', 'text/plain');
    // res.write("Hello World");
    // res.end();

    
    res.setHeader("Content-Type", "text/html");
    let url = req.url;
    let path= '';
    switch (url) {
        case '/': path = './index.html';
            res.statusCode = 200;
            break;
        case '/contact': path = './contact.html';
            res.statusCode = 200;
            break;
        case '/about': path = './about.html';
            res.statusCode = 200;
            break;
        default:
            path = './404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) =>{
        if(err) console.log(err);
        // res.write(data);
        res.end(data); 
    })
    
    
})

server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})