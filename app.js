var express                             =require("express");
var app                                 =express();
var bodyParser                          =require('body-parser');

var customer                            =require('./routes/customerLoginRoutes');
var serviceProvider                     =require('./routes/serviceProviderLoginRoutes');
var admin                               =require('./routes/adminLoginRoutes');
var json                                =bodyParser.urlencoded();

const swaggerUi                         = require('swagger-ui-express');
const swaggerDocument                   = require('./swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(json);
app.use('/customer',customer);
app.use('/serviceProvider',serviceProvider);
app.use('/admin',admin);

app.listen(3000,()=>{
    console.log("service provider app is running");
});
