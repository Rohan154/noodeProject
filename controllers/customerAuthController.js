
var customerService=require('../services/customerAuthServices');
var bcrypt=require('bcryptjs');
var webToken=require('../middleware/Auth');


async function custAuthRegister(req,res,next){
    var today = new Date();
    var hash=await bcrypt.hash(req.body.password,10);
    var customer={
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      password:hash,
      created:today,
      modified:today,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      area:req.body.area
    }
    try{
        let results=await customerService.tasks.register(customer);
        res.json(results);
        console.log(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);   
        
    }
}


async function custAuthLogin(req,res,next){
    var customerLogin={
     
      email:req.body.email,
      password:req.body.password
     
    }
    try{
        let results=await customerService.tasks.login(customerLogin);
        if(results.length >0){
          var data=await bcrypt.compare(customerLogin.password, results[0].password);
            if(data==true){
             let loginToken={
               id:customerLogin.email ,
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



async function custAuthUpdate(req,res,next){
  var today = new Date();
  var hash=await bcrypt.hash(req.body.password,10);
  var customerUpdate={
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    password:hash,
    created:today,
    modified:today,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    area:req.body.area,
    id:req.body.id
  }
  try{
      let results=await customerService.tasks.update(customerUpdate);
      res.json(results);
      console.log(results);
  }catch(e){
      console.log(e);
      res.sendStatus(500);   
      
  }
}



async function searchServiceProvider(req,res,next){
  var SP={
    id:req.params.id
  }
  try{
      let results=await customerService.tasks.searchSP(SP);
      res.json(results);
      console.log(results);
  }catch(e){
      console.log(e);
      res.sendStatus(500);   
      
  }
}


exports.customer={
    custAuthRegister:custAuthRegister,
    custAuthLogin:custAuthLogin,
    custAuthUpdate:custAuthUpdate,
    searchServiceProvider:searchServiceProvider
}