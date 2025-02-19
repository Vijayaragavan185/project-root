const Location = require('../models/locationModel');

const locationController = {
  // Update user location
  updateLocation: async (req, res) => {
    try {
      const { userId, latitude, longitude, speed } = req.body;
      
      const location = new Location({
        userId,
        latitude,
        longitude,
        speed,
        mode: speed > 5 ? 'vehicle' : 'walking' // Simple speed-based mode detection
      });

      await location.save();
      res.status(201).json({ message: 'Location updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user's latest location
  getLocation: async (req, res) => {
    try {
      const { userId } = req.params;
      const location = await Location.findOne({ userId }).sort({ timestamp: -1 });
      
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }

      res.json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = locationController;