const Analytics = require('../models/analytics');
const { subtractSecondsFromCurrentTime } = require('../utils');
const { Op } = require('sequelize');

// Helper function to determine the time window for an event type
const getTimeWindow = (eventType) => {
    if (eventType === 'click') {
        return subtractSecondsFromCurrentTime(3);
    } else if (eventType === 'pageView') {
        return subtractSecondsFromCurrentTime(5);
    }
    return null;
};

const postAnalytics = async (req, res) => {
    const events = req.body;
    let ingestedCount = 0;

    for (const event of events) {
        const { eventType, user } = event;

        // Get the appropriate time window
        const timeWindow = getTimeWindow(eventType);
        if (!timeWindow) continue;

        // Check for existing events within the time window
        const existingEvent = await Analytics.findOne({
            where: {
                eventType,
                user,
                date: { [Op.gte]: timeWindow }
            }
        });

        // If no existing event is found, create the new event
        if (!existingEvent) {
            await Analytics.create({
                eventType,
                user,
                date: new Date()
            });
            ingestedCount++;
        }
    }

    res.status(201).json({ ingested: ingestedCount });
};

const getAnalytics = async (req, res) => {
    const events = await Analytics.findAll();
    res.status(200).json(events);
};

const methodNotAllowed = (req, res) => {
    res.status(405).send();
};

module.exports = {
    postAnalytics,
    getAnalytics,
    methodNotAllowed
};
