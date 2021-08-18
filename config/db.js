const mongoose = require('mongoose');

const connectDB = async() =>{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser :true,   //this second params just to avoid some warnings in console.
        useCreateIndex : true,
        useFindAndModify : false,
        useUnifiedTopology: true
    });   //Since, it returns a promise.

    console.log(`Connected to Database ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;