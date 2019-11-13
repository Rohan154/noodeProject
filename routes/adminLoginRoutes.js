var express                   =require('express');
var login                     =require('../controllers/adminAuthController');
var router                    =express.Router();

var adminLoginValidator       =require('../validator/validation');
/*
++++++++++++++++++++++++++router for admin functionality+++++++++++++++++++++++++++++++
*/
router.post('/register',adminLoginValidator.task.adminRegisterValidator,login.admin.adminAuthRegister);
router.post('/login',adminLoginValidator.task.adminLoginValidator,login.admin.adminAuthLogin);
router.get('/customers',login.admin.adminFetchCustomer)
router.get('/serviceProviders',login.admin.adminFetchServiceProvider)
module.exports = router;