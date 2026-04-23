const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, defaultValue: 'Daily Menu' },
  items: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'menus', timestamps: true });

module.exports = Menu;
