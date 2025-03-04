const Location = require('../models/locationModel');

const locationController = {
  updateLocation: async (req, res) => {
    try {
      const { userId, latitude, longitude, speed, isPothole, severity } = req.body;
      
      const location = new Location({
        userId,
        latitude,
        longitude,
        speed,
        isPothole,
        severity
      });

      await location.save();
      res.status(201).json({ message: 'Location updated', isPothole });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPotholes: async (req, res) => {
    try {
      const potholes = await Location.find({ 
        isPothole: true 
      }).sort({ timestamp: -1 });
      
      res.json(potholes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = locationController;