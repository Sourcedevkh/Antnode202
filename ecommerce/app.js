const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
const PORT = process.env.PORT;
const authRoute = require('./routes/auth')

app.use('/auth', authRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})