var express                   =require('express');
var login                     =require('../controllers/customerAuthController');
var router                    =express.Router();

var custLoginValidator=require('../validator/validation');

router.post('/register',custLoginValidator.task.custRegisterValidator,login.customer.custAuthRegister);
router.post('/login',custLoginValidator.task.custLoginValidator,login.customer.custAuthLogin);
router.put('/update',login.customer.custAuthUpdate);
router.get('/searchSP/:id',login.customer.searchServiceProvider)

module.exports = router;