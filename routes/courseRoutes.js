const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateEmployee, authenticateVendor } = require('../middleware/isAdmin');

// router.post('/add', authenticateAdmin, courseController.addCourse);
// router.get('/', authenticateAdmin, courseController.getCourse);
// router.get('/all', courseController.getAllCourse);


router.post('/add', authenticateVendor, courseController.addCourse);
router.get('/my-courses', authenticateVendor, courseController.getCourseByVendor);
router.get('/all', courseController.getAllCoursesByEmployees);
router.post('/buy/courseId', authenticateEmployee, courseController.buyCourse)


module.exports = router;
