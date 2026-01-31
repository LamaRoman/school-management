export class AppError extends Error{
    constructor(message,statusCode=500){
        super(message)
        this.statusCode = `${statusCode}`.startsWith('4')?'Fail':'error';
        this.isOperational = true

        //Capture stack trace
        Error.captureStackTrace(this,this.constructor)
    }
}
