const mysql=require('mysql');

//database connection
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"findNearBySP"
})

//connecting the databse
connection.connect((err)=>{
    if(err){
        throw err;
    }
    else
    console.log(" database is connected");
});

module.exports=connection;