const { Op } = require('sequelize');
const Reminder = require('../models/reminders');

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { user, description, date } = req.body;
    const reminder = await Reminder.create({ user, description, date });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reminders, with optional filtering by user and date
exports.getReminders = async (req, res) => {
  try {
    const { user, after } = req.query;
    const where = {};

    if (user) {
      where.user = user;
    }

    if (after) {
      where.date = { [Op.gte]: new Date(parseInt(after)) };
    }

    const reminders = await Reminder.findAll({ where, order: [['id', 'ASC']] });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a reminder by ID
exports.getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findByPk(req.params.id);
    if (reminder) {
      res.status(200).json(reminder);
    } else {
      res.status(404).send('ID not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Method not allowed handler for unsupported methods
exports.methodNotAllowed = (req, res) => {
  res.status(405).send('Method Not Allowed');
};
