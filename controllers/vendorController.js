const vendorService = require('../services/vendorServices');

class VendorController {
  async registerVendor(req, res) {
    try {
      const payload = req.body;
      const result = await vendorService.registerVendor(payload);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async loginVendor(req, res) {
    try {
        const payload = req.body;
        const result = await vendorService.loginVendor(payload);
        res.status(result.status).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = new VendorController();
  
