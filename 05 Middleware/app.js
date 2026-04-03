const express = require('express');
const morgan = require('morgan');


const app = express();
const PORT = 3000;

/* User define Middleware */
// app.use((req, res, next) =>{
//     const formatter = new Intl.DateTimeFormat('en-GB', {
//     timeZone: 'Asia/Phnom_Penh',
//     dateStyle: 'full',
//     timeStyle: 'long'
//     });

//     console.log('Phnom Penh Time:', formatter.format(new Date()));
//     console.log(req.url);
//     console.log(req.method);
//     next();
// })

/* Third party Middleware */
app.use(morgan('short'));

/* Specific Middleware when call function used */
let count = 0;

const isAuth = (req, res, next) =>{
    let isAuth = false;
    count++;
    console.log(count);
    
    if(count > 3){
        res.json({
            msg: 'Your IP is blocked'
        })   
    }else{
        if(isAuth){
            next();
        }else{
            res.status(401).json({
                msg: 'You need to login'
            })
        }
    }

}

/* Protected all routes */
// app.use((req, res, next) =>{
//     let isAuth = true;
//     if(isAuth){
//         next();
//     }else{
//         res.status(401).json({
//             msg: 'You need to login'
//         })
//     }
// })


app.get('/', (req, res) =>{
    res.json({
        msg: 'Hello'
    })  
})

app.get('/contact', isAuth, (req, res) =>{
    res.json({
        msg: 'Contact'
    })
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})