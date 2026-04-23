const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BusinessUser = sequelize.define('BusinessUser', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: { type: DataTypes.STRING, defaultValue: 'business' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  lastLogin: { type: DataTypes.DATE }
}, { tableName: 'business_users', timestamps: true });

module.exports = BusinessUser;
