const express = require('express');
const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(authRoute);

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})