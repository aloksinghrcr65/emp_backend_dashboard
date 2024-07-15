const Vendor = require("../models/vendorModel");
const response = require("../utilities/error-handling");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class VendorService {
  async registerVendor(payload) {
    try {
        console.log('payload', payload)
      const { vendorName, email, username, password } = payload;
      const existingVendor = await Vendor.findOne({ email });
      if (existingVendor) {
        return response.Unauthorized(
          "This email already exist, Please try with new one"
        );
      }

      if (vendorName && email && username && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = new Vendor({
            vendorName,
            email,
            username,
            password: hashedPassword,
        });
        await vendor.save();
        return response.sendSuccess("Vendor registered successfully", vendor);
      }
      return response.Request_failed("All fields are required.");
    } catch (error) {
      console.log("error", error);
      throw response.Internal_Server_Error("Vendor registration failed");
    }
  }
  async loginVendor(payload) {
    try {
        console.log("login payload", payload)
      const { email, password } = payload;

      if (!email || !password) {
        return response.Not_found("All fields are required");
      }

      const vendor = await Vendor.findOne({ email });
      if (!vendor) {
        return response.Unauthorized(
          "This Email did not exist, Please firstly register this email"
        );
      }

      const isValidPassword = await bcrypt.compare(password, vendor.password);

      if (!isValidPassword) {
        return response.Unauthorized("Email or password doesn't match.");
      }

      const tokenpayload = {
        email: vendor.email,
        username: vendor.username,
        role: vendor.role,
      };
      const token = jwt.sign(tokenpayload, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
      });
      return response.sendSuccess("user is successfully login .", token);
    } catch (err) {
        console.log("error are", err)
      return response.Request_failed(" login Internal server error.", err);
    }
  }
}

module.exports = new VendorService();
