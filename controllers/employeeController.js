const employeeServices = require("../services/employeeServices");

class employeeController {
  async employeeRegistration(req, res) {
    const payload = req.body;
    const user = req.user;
    const result = await employeeServices.registerEmployee(payload, user);
    // console.log(result)
    res.status(result.status).json(result);
  }
  async loginEmployee(req, res) {
    const payload = req.body;
    const result = await employeeServices.loginEmployee(payload);
    res.status(result.status).json(result)
  }
  async employeeUpdate(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const payload = req.body;
    console.log(payload);
    // const requiredFields = ["emp_name", "emp_contact"];
    // const missingFields = requiredFields.filter((field) => !payload[field]);

    // if (missingFields.length > 0) {
    //   const errorMessage = `${missingFields.join(", ")} field is missing: `;
    //   return res.status(400).json({ message: errorMessage });
    // }

    const result = await employeeServices.updateEmployee(payload, id);
    res.status(result.status).json(result);
  }
  async employeeDelete(req, res) {
    const { id } = req.params;
    const result = await employeeServices.deleteEmployee(id); //
    res.status(result.status).json(result);
  }
}

module.exports = new employeeController();
