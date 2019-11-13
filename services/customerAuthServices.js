var connection = require('../config/mysqlLib');

function register(data) {

    try{
        return new Promise((resolve, reject) => {
            connection.query("select email from customer where email=?", [data.email], (err, results) => {
                if (err) {
                  reject(err);
                }
                else if (results && results.length) {
                    resolve("this data is already existed . Please provide another detail");
                }
                else {
                    connection.query("insert into customer(first_name,last_name,email,password,created,modified,latitude,longitude,area) values(?,?,?,?,?,?,?,?,?)", [data.first_name, data.last_name, data.email, data.password, data.created, data.modified,data.latitude,data.longitude,data.area], function (err, results) {
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
        connection.query("select email,password from customer where email=?", [loginData.email], (err, results) => {
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
        connection.query("UPDATE customer SET first_name= ?,last_name= ?,email= ?,password=?,latitude=?,longitude=?  WHERE id=?", [updateData.first_name,updateData.last_name,updateData.email,updateData.password,updateData.latitude,updateData.longitude,updateData.id], (err, results) => {
            if (err) {
                return reject(err);
            }
            else {
               return resolve(results);
            }

        })
    })
}


function searchSP(data) {

    return new Promise((resolve, reject) => {
        connection.query("SELECT customer.first_name AS customer, SP.name AS Service, 3956 * 2 * ASIN(SQRT(POWER(SIN((customer.latitude - abs(SP.latitude)) * pi()/180 / 2), 2) + COS(customer.latitude * pi()/180 ) * COS(abs(SP.latitude) * pi()/180) * POWER(SIN((customer.longitude - SP.longitude) * pi()/180 / 2), 2) )) AS distance FROM customer JOIN SP ON customer.area = SP.area WHERE customer.id=? HAVING distance < 10 ORDER BY distance DESC", [data.id], (err, results) => {
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
    update:update,
    searchSP:searchSP
}