const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {authenticateAdmin, authorizeAdminAction} = require('../middleware/isAdmin');
const validate = require('../middleware/validate');
const { registerEmployeeSchema, updateEmployeeSchema } = require('../joiValidation/employeeValidation');



router.post('/registeremp', authenticateAdmin, validate(registerEmployeeSchema), employeeController.employeeRegistration);
router.post('/login', employeeController.loginEmployee);
router.put('/update/:id', authorizeAdminAction, validate(updateEmployeeSchema), employeeController.employeeUpdate);
// router.put('/update/:id', authenticateAdmin, (req, res, next) => {
//      const { id } = req.params; 
//      console.log(id)
//     if (!id) {
//       return res.status(400).json({ message: 'ID is required' });
//     }
//     employeeController.employeeUpdate(req, res, next);
//   });
  
router.delete('/delete/:id', authorizeAdminAction, employeeController.employeeDelete);
// router.patch('/update/:id', authenticateAdmin, employeeController.updateEmployee);

// router.post('/add', employeeController.addEmployee);
// router.put('/update/:id', employeeController.updateEmployee);
// router.post('/add', authenticateAdmin, employeeController.addEmployee);
// router.put('/update/:id', authenticateAdmin, employeeController.updateEmployee);

module.exports = router;
