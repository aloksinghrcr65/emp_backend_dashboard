const courseServices = require("../services/courseServices");

class CourseController {
    async addCourse(req, res) {
        const payload = req.body;
        const vendor = req.vendor;
        const result = await courseServices.addCourse(payload, vendor);
        res.status(result.status).json(result);
    }
    async getCourseByVendor(req, res) {
        const vendor = req.vendor;
        const result = await courseServices.getCourseByVendor(vendor);
        res.status(result.status).json(result)
    }
    async getAllCoursesByEmployees(req, res) {
        const result = await courseServices.getAllCoursesByEmployees();
        res.status(result.status).json(result);
    }
    async buyCourse(req, res) {
        const { employeeEmail } = req.user.company_email;
        const { courseId } = req.body;
        const result = await courseServices.buyCourse(employeeEmail, courseId);
        res.status(result.status).json(result)
    }
    
}

module.exports = new CourseController();