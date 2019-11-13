var connection = require('../config/mysqlLib');

function register(data) {

    try{
        return new Promise((resolve, reject) => {
            connection.query("select email from admin where email=?", [data.email], (err, results) => {
                if (err) {
                  reject(err);
                }
                else if (results && results.length) {
                    resolve("this data is already existed . Please provide another detail");
                }
                else {
                    connection.query("insert into admin(name,email,password) values(?,?,?)", [data.name, data.email, data.password], function (err, results) {
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
        connection.query("select email,password from admin where email=?", [loginData.email], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
               return resolve(results);
            }

        })
    })
}


function fetchCustomer() {

    return new Promise((resolve, reject) => {
        connection.query("select * from customer", (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
               return resolve(results);
            }

        })
    })
}


function fetchSP() {

    return new Promise((resolve, reject) => {
        connection.query("select * from SP", (err, results) => {
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
    fetchCustomer:fetchCustomer,
    fetchSP:fetchSP
}