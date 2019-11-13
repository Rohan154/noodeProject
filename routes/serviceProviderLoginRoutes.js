var express                   =require('express');
var login                     =require('../controllers/serviceProviderController');
var router                    =express.Router();

var spLoginValidator=require('../validator/validation');

router.post('/register',spLoginValidator.task.spRegisterValidator,login.sp.spAuthRegister);
router.post('/login',spLoginValidator.task.spLoginValidator,login.sp.spAuthLogin);
router.put('/update',login.sp.spAuthUpdate);

module.exports = router;