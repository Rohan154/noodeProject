var joi=require('joi');

function custRegisterValidator(req,res,next){
    const schema=joi.object().keys({
       first_name:joi.string().min(3).max(30).required(),
       last_name:joi.string().min(3).max(30).required(),
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),
       latitude:joi.string().required(),
       longitude:joi.string().required(),
       area:joi.string().min(2).max(20).required()

    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body.err);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
}   


function custLoginValidator(req,res,next){
    const schema=joi.object().keys({
      
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),

    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
}   

function spRegisterValidator(req,res,next){
    const schema=joi.object().keys({
       name:joi.string().min(3).max(30).required(),
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),
       area:joi.string().min(2).max(20).required(),
       latitude:joi.string().required(),
       longitude:joi.string().required(),

    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body.err);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
}   


function spLoginValidator(req,res,next){
    const schema=joi.object().keys({
      
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),

    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
}   





function adminRegisterValidator(req,res,next){
    const schema=joi.object().keys({
       name:joi.string().min(3).max(30).required(),
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),
       
    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body.err);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
}   


function adminLoginValidator(req,res,next){
    const schema=joi.object().keys({
      
       email:joi.string().email(),
       password:joi.string().min(5).max(10).required(),

    });
    joi.validate(req.body,schema,(err,result)=>{
        if(err){
            console.log(req.body);
            return res.send("Error occured"+err);
        }
        else{
            next(); 
        }
    })
} 

exports.task={
    custRegisterValidator:custRegisterValidator,
    custLoginValidator:custLoginValidator,
    spRegisterValidator:spRegisterValidator,
    spLoginValidator:spLoginValidator,
    adminRegisterValidator:adminRegisterValidator,
    adminLoginValidator:adminLoginValidator
}