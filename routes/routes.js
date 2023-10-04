const express = require('express');
const controller = require('../controller/controller');
const roleCheck = require('../controller/roleCheck');

const router = express.Router();

router.post('/register', controller.register)

router.post('/login', controller.login);

router.post('/addData', controller.verifyToken, roleCheck('admin'), controller.addData);

router.get('/getAll', controller.verifyToken, controller.getAll);

router.get('/getById/:id', controller.verifyToken, controller.getHotelById);

router.put('/update/:id', controller.verifyToken, roleCheck('admin'), controller.update) ;

router.delete('/delete/:id', controller.verifyToken, roleCheck('admin'), controller.delete)


module.exports = router;