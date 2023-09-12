const { error } = require('console');
const AppError = require('../utils/AppError')

const globalErrHandler = (err, req, res, next)=>{
    //log to console for dev
    console.log(err.message);

    // Mongoose bad ObjectId
    if(err.name ==="CastError"){
        const message = `Resource not found`;
        error = new AppError(message,404);
    }

    // Mongoose duplicate key
    if (err.code === 11000){
        const keyDuplicate = Object.keys(error.keyValue);
        const values = keyDuplicate.map((key)=> key);
        const message = `${values.join(
            ' ',
        )} have already existed. Please use another value!`;
        error = new AppError(message, 404);
    }

    //Mongoose Validation Error
    if(err.name === 'ValicadtionError'){
        const message = Object.values(err.errors).map((e)=>e.message);
        error = new AppError(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message:err.message || 'Server error'
    });
};
module.exports = globalErrHandler;