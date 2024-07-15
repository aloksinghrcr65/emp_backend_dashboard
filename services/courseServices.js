const Course = require('../models/coursesModel');
const Employee = require('../models/empModel');
const Vendor = require('../models/vendorModel');
const response = require('../utilities/error-handling')

class CourseService {
    async addCourse(payload, vendor) {
        try {
            const newCourse = new Course({
                courseName: payload.courseName,
                courseFee: payload.courseFee,
                courseDuration: payload.courseDuration,
                courseValidUpto: payload.courseValidUpto,
                addedBy: {
                    username: vendor.username,
                    email: vendor.email,
                    role: vendor.role
                }
            });
            await newCourse.save();

            await Vendor.findOneAndUpdate(
                { username: vendor.username },
                { $addToSet: { certificates: { courseId: newCourse._id, certificateName: newCourse.courseName } } },
                { new: true, useFindAndModify: false }
            );
            return response.sendSuccess("Course added successfully", newCourse)
        } catch (error) {
            console.log("error", error);
            return response.Internal_Server_Error("Add course Internal Server Error")
        }
    }

    async getCourseByVendor(vendor) {
        try {
            const courses = await Course.find({ "addedBy.username": vendor.username })
            return response.sendSuccess("Data successfully fetched", courses);
        } catch (error) {
            return response.Internal_Server_Error("Get courses Internal Server Error")
        }
    }
    async getAllCoursesByEmployees() {
        try {
            const allCourses = await Course.find();
            return response.sendSuccess("All available courses are here:", allCourses);
        } catch (error) {
            return response.Internal_Server_Error("Internal Server Error while fetching all courses")
        }
    }
    async buyCourse(employeeEmail, courseId) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                return response.Request_failed("Course not found");
            }

            const employee = await Employee.findOne(employeeEmail);
            if (!employee) {
                return response.Request_failed("Employee not found");
            }

            const vendor = await Vendor.findOne({ username: course.addedBy.username });
            if (!vendor) {
                return response.Request_failed("Vendor not found");
            }

            const courseDetails = {
                courseId: course._id,
                courseName: course.courseName,
                vendorId: vendor._id,
                vendorName: vendor.vendorName            };

            employee.purchasedCourses.push(courseDetails)
            await employee.save();

            return response.sendSuccess("Course purchased successfully", { employee });
        } catch (error) {
            console.log("error", error)
            return response.Internal_Server_Error("Buy Course Internal Server Error")
        }
    }    
}

module.exports = new CourseService();