const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authGetEmployee} = require('../middleware/isAdmin');
const validate = require('../middleware/validate');
const { registerUserSchema, loginUserSchema, updateUserSchema } = require('../joiValidation/userValidation');

router.post('/register', validate(registerUserSchema), userController.userRegistration);
router.post('/login', validate(loginUserSchema), userController.userLogin);
router.put('/:id', validate(updateUserSchema), userController.userUpdate);
router.delete('/:id', userController.userDelete);
router.get('/getemployeeDetails', authGetEmployee, userController.getEmployee);

module.exports = router;
