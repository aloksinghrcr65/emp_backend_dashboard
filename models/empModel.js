const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  emp_name: { type: String, required: true },
  emp_address: { type: String, required: true },
  emp_designation: { type: String, required: true },
  emp_department: { type: String, required: true },
  emp_contact: { type: String, required: true },
  emp_email: { type: String, required: true, unique: true },
  company_email: { type: String, required: true },
  password: { type: String, required: true },
  addedBy: {
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }
  },
  purchasedCourses: [
    {
      courseId: { type: mongoose.Schema.ObjectId, ref: 'Course' },
      courseName: { type: String },
      vendorId: { type: mongoose.Schema.ObjectId, ref: 'Vendor' },
      vendorName: { type: String }
    }
  ],
  profilePic: String,
  role: {
    type: String,
    default: "employee"
  }
}, { timestamps: true } );

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
