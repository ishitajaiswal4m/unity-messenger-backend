const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err,req,res,next)=>{
//log to console for dev
console.log(err); //will give error and file info

let error = {...err};
error.message = err.message;

//Mongoose bad object ID
//console.log(err.name);  
if(err.name ==='CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message,404);
}

//Mongoose Duplicate Key
if(err.code == 11000){ //can check by error name or code, check err code by consolling the errors ie console.log(err); 
    const message = `Duplicate key value entered`;
    error = new ErrorResponse(message,400);
}

//Mongoose Validation Error
if(err.name === 'ValidationError'){   //it gives err as array (named errors:{ }) of objects
    const message = Object.values(err.errors).map(val=>val.message);
    error = new ErrorResponse(message,400);
}

res.status(error.statusCode || 500).json({
    success:false,
    error:error.message || 'server error'
});
}
module.exports = errorHandler;