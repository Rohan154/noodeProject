var connection = require('../config/mysqlLib');

function register(data) {

    try{
        return new Promise((resolve, reject) => {
            connection.query("select email from SP where email=?", [data.email], (err, results) => {
                if (err) {
                  reject(err);
                }
                else if (results && results.length) {
                    resolve("this data is already existed . Please provide another detail");
                }
                else {
                    connection.query("insert into SP(name,email,password,area,latitude,longitude) values(?,?,?,?,?,?)", [data.name, data.email, data.password,data.area,data.latitude,data.longitude], function (err, results) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(results);
                        }
                    })
                }
            })
        })
    }
    catch(err)
    {
       throw new err
    }
   
    
}




function login(loginData) {

    return new Promise((resolve, reject) => {
        connection.query("select email,password from SP where email=?", [loginData.email], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
               return resolve(results);
            }

        })
    })
}


function update(updateData) {

    return new Promise((resolve, reject) => {
        connection.query("UPDATE SP SET name= ?,email= ?,password=?,area=?,latitude=?,longitude=?  WHERE id=?", [updateData.name,updateData.email,updateData.password,updateData.area,updateData.latitude,updateData.longitude,updateData.id], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
               return resolve(results);
            }

        })
    })
}


exports.tasks = {
    register: register,
    login: login,
    update:update
}