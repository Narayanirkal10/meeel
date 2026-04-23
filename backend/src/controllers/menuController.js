const { Menu, School } = require('../models');

exports.uploadMenu = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'Image required' });

    const { schoolId, items } = req.body;
    if (!schoolId) return res.status(400).json({ success: false, error: 'schoolId is required' });

    const menu = await Menu.create({
      schoolId: parseInt(schoolId),
      items,
      imageUrl: req.file.path,
      title: 'Daily Menu',
    });

    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDailyMenu = async (req, res) => {
  try {
    const { schoolId } = req.params;
    
    // Check if schoolId is a valid number
    if (isNaN(schoolId) || !schoolId) {
      return res.status(400).json({ success: false, error: 'Please provide a valid numeric schoolId' });
    }

    const menu = await Menu.findOne({
      where: { schoolId: parseInt(schoolId) },
      order: [['date', 'DESC']],
    });

    if (!menu) return res.status(404).json({ success: false, error: 'No menu found for this school' });

    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
