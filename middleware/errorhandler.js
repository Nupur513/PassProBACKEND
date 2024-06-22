const { logevents } = require("./logger")

const  errorhandler=(err,req,res,next)=>{
    logevents(`${err.name}: ${err.message} ${req.method} ${req.url} ${req.headers.origin}`, 'errorlog.log');
    console.log(err.stack)

    const status= res.statuscode ? res.statuscode : 500 //server error
    res.status(status)

    res.json({message: err.message})
    next()


}

module.exports=errorhandler