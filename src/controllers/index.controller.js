const { getWelcomeMessage } = require("../services/index.service");

const getWelcome = (req, res) => {
    const message = getWelcomeMessage();

    res.json({
        message
    });
};

module.exports = {
    getWelcome
};