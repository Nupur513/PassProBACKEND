const allowedorigins=require('./allowedorigins')

const corsoptions={
    origin:(origin,callback)=>{
        if(allowedorigins.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('not allowed by CORS'))
        }
    },
    credentials:true,
    optionssuccessstatus:200
}

module.exports=corsoptions