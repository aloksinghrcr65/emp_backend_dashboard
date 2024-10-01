const Employee = require("../models/empModel");
const response = require("../utilities/error-handling");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
 
class EmployeeService {
  async registerEmployee(payload,user/*headers*/) {
    try {

      if (!payload.emp_email || !payload.emp_name) {
        return response.Request_failed("Required fields missing");
      }
      if(user.role!=="admin"){
        response.Unauthorized("YOU ARE NOT AUTHANTICATED"); 
      }
      const existingEmployee= await Employee.findOne({emp_email:payload.emp_email})
      if(existingEmployee){
        return response.Unauthorized("email is already exist try another");
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10)
      const newEmployee = new Employee({
        emp_name:payload.emp_name,
        emp_address:payload.emp_address,
        emp_designation:payload.emp_designation,
        emp_department:payload.emp_department,
        emp_contact:payload.emp_contact,
        emp_email:payload.emp_email,
        company_email:payload.company_email,
        password:hashedPassword,
        addedBy: {
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
      console.log("emp", newEmployee)

      await newEmployee.save();

      // send mail on employee mail which contain email and password
      // await this.sendRegistrationEmail(newEmployee.emp_email, newEmployee.emp_email, newEmployee.password)
      return   response.sendSuccess("Employee added successfully", newEmployee);
    } catch (error) {
      console.log("error", error);
     return response.Internal_Server_Error("Add emp Internal server error");
    }
  }

  async sendRegistrationEmail(to, email, password) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER, // admin gmail id
          pass: process.env.EMAIL_PASS, // admin gmail password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: Employee.emp_email,
      subject: 'Employee Registration Details',
      text: `Hello, your registration was successful. Your login details are as follows:\Email: ${email}\nPassword: ${password}`
    }
    await transporter.sendMail(mailOptions);
  }

  async loginEmployee(payload) {
    try {
      const { email, password } = payload;

      if(!email || !password) {
        return response.Not_found("All fields are required");
      }

      const employee = await Employee.findOne({ company_email: email });
      if(!employee) {
        return response.        
        Not_found("Email did not exist. Please register first.")
      }

      const isMatch = await bcrypt.compare(password, employee.password);
      if(!isMatch) {
        return response.Request_failed("Invalid email or password")
      }

      const tokenPayload = {
        name: employee.emp_name,
        email: employee.emp_email,
        company_email: employee.company_email,
        role: employee.role
      }

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, { expiresIn: '5d'});
      return response.sendSuccess("Login Successful", token)

    } catch (err) {
      return response.Internal_Server_Error("Employee Login Internal Server Error")
    }
  }

  async updateEmployee(payload, id) {
    try {
      
      const updatedEmployee = await Employee.findByIdAndUpdate(id, payload);
      console.log("updatedEmployee", updatedEmployee);
      if (!updatedEmployee) {
        return response.Not_found('Employee not found');
      }
  
      
     return response.sendSuccess('Employee updated successfully', updatedEmployee);
    } catch (error) {
      console.log("error", error)
      return response.Internal_Server_Error('Update Internal server error');
    }
  };

  async deleteEmployee(id) {
    try{
      // console.log("id===================>",id) 
      const deletedata=  await Employee.findByIdAndDelete(id);
         console.log("deletedata",deletedata)
        return response.sendSuccess("Employee deleted successfully")
    } catch(error) {
        return response.Internal_Server_Error("Internal Server Error");
    }
  }
}

module.exports = new EmployeeService()
