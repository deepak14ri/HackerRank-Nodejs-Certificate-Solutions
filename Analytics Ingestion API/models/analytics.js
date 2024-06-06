const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Ensure correct path to connection

const Analytics = sequelize.define('Analytics', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

module.exports = Analytics;
