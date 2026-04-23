const BusinessUser = require('./BusinessUser');
const School = require('./School');
const Menu = require('./Menu');

// Associations (Relationships)
School.hasMany(Menu, { foreignKey: 'schoolId' });
Menu.belongsTo(School, { foreignKey: 'schoolId' });

module.exports = {
  BusinessUser,
  School,
  Menu
};
