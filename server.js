const express= require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');


const dotenv=require('dotenv').config();

connectDb();

const app=express();

const port=process.env.port;

//body parser
app.use(express.json());

app.use(errorHandler);



app.use('/api/contacts',require("./routes/contactRoutes"));
app.use('/api/user',require("./routes/userRoutes"));





app.listen(port,()=>{
    console.log(`this application run at http://localhost:${port}`);
})