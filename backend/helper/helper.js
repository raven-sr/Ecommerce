class errorHandler extends Error
{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
        this.name=errorHandler
        Error.captureStackTrace(this,errorHandler)
    }

}
export default errorHandler