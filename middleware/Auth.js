var jwt=require('jsonwebtoken');
function generateAuthToken(data){
   return new Promise((resolve,reject)=>{
       jwt.sign(data.id,data.key,(err,token)=>{
           if(err){
               reject(err);
           }
           else{
               resolve(token);
           }
       });
   });
}


function verifyAuthToken(data){
    return new Promise((resolve ,reject)=>
    {
        
        jwt.verify(data.token,data.key,(err,decode)=>
        {
            if(err)
            {
                reject(err)
            }
            else{
                console.log(decode);
                resolve(decode);
            }
        })
    })
}





exports.task={
    generateAuthToken:generateAuthToken,
    verifyAuthToken:verifyAuthToken
}