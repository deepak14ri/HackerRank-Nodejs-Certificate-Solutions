const { Sequelize } = require('sequelize');

// Initialize the Sequelize instance with SQLite in-memory database
const sequelize = new Sequelize('sqlite::memory:');

(async () => {
    try {
        // Authenticate the connection
        await sequelize.authenticate();
        console.log('SQLite successfully connected!');
    } catch (error) {
        console.error('Unable to connect to SQLite database:', error);
    }
})();

module.exports = sequelize; // Export the sequelize instance
