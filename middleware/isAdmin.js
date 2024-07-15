const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ErrorHandler = require("../utilities/error-handling");
const User = require("../models/userModel");
const employeeModel = require("../models/empModel");
const Employee = require("../models/empModel");
dotenv.config();

//  const AUTH_HEADER = 'Authorization';
const authenticateAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)

  if (!authorization) {
    return res
      .status(400)
      .json(ErrorHandler.Request_failed("Token is required in Authorization header"));
  }
  
  if (!authorization.startsWith("Bearer ")) {
    return res
      .status(400)
      .json(ErrorHandler.Request_failed("Invalid token format"));
  }

  const token = authorization.split(" ")[1];
  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (userPayload.role === "admin") {
      req.user = userPayload;
      next();
    } else {
      return res
        .status(403)
        .json(ErrorHandler.Unauthorized("Unauthorized: Not an admin"));
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json(ErrorHandler.Internal_Server_Error("Auth Internal server error"));
  }
};


const authorizeAdminAction = async (req, res, next) => {
  console.log("Incoming request params:", req.params);

  const param_id = req.params.id;
  const { authorization } = req.headers;
  
  console.log("Authorization header:", authorization);
  
  if (!authorization) {
    return res.status(400).json(ErrorHandler.Request_failed("Token is required in Authorization header"));
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(400).json(ErrorHandler.Request_failed("Invalid token format"));
  }

  const token = authorization.split(" ")[1];
  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token payload:", userPayload);

    if (userPayload.role === "admin") {
      const data = await employeeModel.findOne({ _id: param_id });
      console.log("Employee data found:", data);

      if (data && data.addedBy.username === userPayload.username) {
        console.log("Authorization successful");
        return next();
      } else if (!data) {
        return res.status(404).json(ErrorHandler.Request_failed("Employee not found"));
      } else {
        return res.status(403).json(ErrorHandler.Unauthorized("Unauthorized: Not authorized to access this resource."));
      }
    } else {
      return res.status(403).json(ErrorHandler.Unauthorized("Unauthorized: Not an admin"));
    }
  } catch (error) {
    console.log("Error during authorization:", error);
    return res.status(500).json(ErrorHandler.Internal_Server_Error("Auth Internal server error"));
  }
};

const authGetEmployee = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(401)
      .json(
        ErrorHandler.Unauthorized("Unauthorized: Token missing or invalid")
      );
  }

  const token = authorization.split(" ")[1];
  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("details", userPayload);

    if (userPayload.role === "admin") {
      var findAdminUsername = await Employee.find(
        { "addedBy.username": userPayload.username },
        { addedBy: 0 }
      )
      if (!findAdminUsername) {
        res
          .status(500)
          .json(ErrorHandler.Unauthorized("You are not authanticated"));
      }
    } else {
      return res
        .status(403)
        .json(ErrorHandler.Unauthorized("Unauthorized: Not an admin"));
    }
    req.user = findAdminUsername;
    console.log("now data", req.user);
    next();
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json(ErrorHandler.Internal_Server_Error("Auth Internal server error"));
  }
};

const authenticateVendor = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(400).json(ErrorHandler.Request_failed('Token is required or invalid format'));
  }

  const token = authorization.split(' ')[1];
  try {
    const vendorPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (vendorPayload.role === 'vendor') {
      req.vendor = vendorPayload;
      next();
    } else {
      return res.status(403).json(ErrorHandler.Unauthorized('Unauthorized: Not a vendor'));
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json(ErrorHandler.Internal_Server_Error('Auth Internal server error'));
  }

  
};

const authenticateEmployee = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(400).json(ErrorHandler.Request_failed('Token is required or invalid format'));
  }

  const token = authorization.split(' ')[1];
  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("user data", userPayload)
    if (userPayload.role === 'employee') {
      req.user = userPayload;
      next();
    } else {
      return res.status(403).json(ErrorHandler.Unauthorized('Unauthorized: Not an employee'));
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json(ErrorHandler.Internal_Server_Error('Auth Internal server error'));
  }
};


module.exports = {
  authenticateAdmin,
  authorizeAdminAction,
  authGetEmployee,
  authenticateVendor,
  authenticateEmployee
};
