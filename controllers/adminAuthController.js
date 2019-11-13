var adminService=require('../services/adminAuthServices');
var bcrypt=require('bcryptjs');
var webToken=require('../middleware/Auth');


async function adminAuthRegister(req,res,next){
    var hash=await bcrypt.hash(req.body.password,10);
    var adminDetails={
      name:req.body.name,
      email:req.body.email,
      password:hash,
     
      
    }
    try{
        let results=await adminService.tasks.register(adminDetails);
        res.json(results);
        console.log(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);   
        
    }
}


async function adminAuthLogin(req,res,next){
    var adminLogin={
     
      email:req.body.email,
      password:req.body.password
     
    }
    try{
        let results=await adminService.tasks.login(adminLogin);
        if(results.length >0){
          var data=await bcrypt.compare(adminLogin.password, results[0].password);
            if(data==true){
             let loginToken={
               id:adminLogin.email ,
               key:"key1"
             }
            
            
             console.log(loginToken);
             console.log("hello");
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

async function adminFetchCustomer(req,res,next){
  
  try{
      let results=await adminService.tasks.fetchCustomer();
      res.json(results);
      console.log(results);
  }catch(e){
      console.log(e);
      res.sendStatus(500);   
      
  }
}

async function adminFetchServiceProvider(req,res,next){
  
  try{
      let results=await adminService.tasks.fetchSP();
      res.json(results);
      console.log(results);
  }catch(e){
      console.log(e);
      res.sendStatus(500);   
      
  }
}


exports.admin={
    adminAuthRegister:adminAuthRegister,
    adminAuthLogin:adminAuthLogin,
    adminFetchCustomer:adminFetchCustomer,
    adminFetchServiceProvider:adminFetchServiceProvider
}
