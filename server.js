const express = require('express');
const colors = require('colors');
//Load env files
const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const morgan = require('morgan');
//const bootcamps = require('./routes/bootcamps'); //Route Files import
//connect to Db
const connectDB = require('./config/db');  //should be after loading env files
connectDB(); 

const errorHandler = require('./middleware/error');

const app = express();

//Body Parser- for accesing req.body objects
app.use(express.json());

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));  //dev logging third party middleware 
//Mount Routes
//app.use('/api/v1/bootcamps',bootcamps);   //middleware for error should be after this

//error middleware
app.use(errorHandler); //should be after mounting the routes

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    );
//handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`.red);
    //close server & exit process
    server.close(()=>process.exit(1));
});