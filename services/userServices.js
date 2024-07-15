const User = require("../models/userModel");
const Employee = require("../models/empModel");
const response = require("../utilities/error-handling");
// const validateEmail = require("../middleware/validateEmail")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
class Services {
  async registerUser(payload) {
    try {
      const { name, email, username, password, role } = payload;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.Unauthorized(
          "user is already Exist try another one !!"
        );
      }

      if (name && email && username && password && role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          username,
          password: hashedPassword,
          role,
        });
        await user.save();
        return response.sendSuccess(`${role} registered successfully.`);
      }

      return response.Request_failed("All fields are required.");
    } catch (err) {
      return response.Request_failed("Unable to register admin.");
    }
  }

  async loginUser(data) {
    try {
     
      const { email, password } = data;

      if (!email || !password) {
        return response.Not_found("All fileds are required");
      }

      // if (!validateEmail(email)) {
      //   return response.Request_failed("Invalid email format.");
      // }

      const user = await User.findOne({ email });
      if (!user) {
        return response.Not_found(
          "Email did not exist. Please register first."
        );
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      // if (user.email !== req.body.email){
      //   return response.Unauthorized("Email doesn't match.");
      // }

      if (!isValidPassword) {
        return response.Unauthorized("Email or password doesn't match.");
      }
      const tokenpayload = {
        email: user.email,
        username: user.username,
        role: user.role
      };
      const token = jwt.sign(tokenpayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
      });
      return response.sendSuccess("user is successfully login .", token);
    } catch (err) {
      return response.Request_failed(" login Internal server error.", err);
    }
  }

  async updateUser(payload,id) {
    try {
      // console.log("payload",payload)
      const { name, email, password, role } = payload;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword,
        role
      });
      // console.log("result",result)
      if(result){
         return response.sendSuccess("user is updated successfully.");
      } else {
        return response.Not_found("user not found");
      }
    } catch (err) {
      console.log("error",err)
      return response.Internal_Server_Error("Internal server error.");
    }
  }

  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);
      return response.sendSuccess("Admin deleted successfully.");
    } catch (err) {
      return response.Internal_Server_Error("Internal server error.");
    }
  }

  async getEmployeesAddedByAdmin(data) {
    try {
      
console.log("data===>", data)
       return response.sendSuccess("data successfully sent", data);
    } catch (err) {
      console.log("error get", err)
       return response.Internal_Server_Error("Internal Server Error while fetching emp");
    }
  }
}
module.exports = new Services();
