const services = require("../services/userServices");
class controller {
  async userRegistration(req, res) {
    const payload = req.body;
    const result = await services.registerUser(payload);
    res.status(result.status).json(result);
  }
  async userLogin(req, res) {
    const data = req.body;
    const result = await services.loginUser(data);
    res.status(result.status).json(result);
  }
  async userUpdate(req, res) {
    const { id } = req.params;
    console.log(id);
    const payload = req.body;
    console.log(payload);
    const result = await services.updateUser(payload, id);
    res.status(result.status).json(result);
  }
  async userDelete(req, res) {
    const { id } = req.params;
    const result = await services.deleteUser(id);
    res.status(result.status).json(result);
  }
  async getEmployee(req, res) {
  const data= req.user
   
    const result = await services.getEmployeesAddedByAdmin(data);
    res.status(result.status).json(result);
  }
}

module.exports = new controller();
