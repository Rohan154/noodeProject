
var serviceProvider=require('../services/authServiceProvider');
var bcrypt=require('bcryptjs');
var webToken=require('../middleware/Auth');


async function spAuthRegister(req,res,next){
    var hash=await bcrypt.hash(req.body.password,10);
    var serviceProviderDetails={
      name:req.body.name,
      email:req.body.email,
      password:hash,
      area:req.body.area,
      latitude:req.body.latitude,
      longitude:req.body.longitude
     
      
    }
    try{
        let results=await serviceProvider.tasks.register(serviceProviderDetails);
        res.json(results);
        console.log(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);   
        
    }
}


async function spAuthLogin(req,res,next){
    var serviceProviderLogin={
     
      email:req.body.email,
      password:req.body.password
     
    }
    try{
        let results=await serviceProvider.tasks.login(serviceProviderLogin);
        if(results.length >0){
          var data=await bcrypt.compare(serviceProviderLogin.password, results[0].password);
            if(data==true){
             let loginToken={
               id:serviceProviderLogin.email ,
               key:"key1"
             }
            
             console.log(loginToken);

             const authTokenResult=await webToken.task.generateAuthToken(loginToken)
             res.json({
               message:"login successfull",
               status:200,
               data:results,
               token:authTokenResult
             })
             
            }
            else if(data==false){
               res.send("incorrect password");
            }
            
        }
        console.log(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);   
        
    }
}



async function spAuthUpdate(req,res,next){
  var hash=await bcrypt.hash(req.body.password,10);
  var serviceProviderUpdate={
    name:req.body.name,
    email:req.body.email,
    password:hash,
    area:req.body.area,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    id:req.body.id
  }
  try{
      let results=await serviceProvider.tasks.update(serviceProviderUpdate);
      res.json(results);
      console.log(results);
  }catch(e){
      console.log(e);
      res.sendStatus(500);   
      
  }
}


exports.sp={
   spAuthRegister:spAuthRegister,
   spAuthLogin:spAuthLogin,
   spAuthUpdate:spAuthUpdate
}