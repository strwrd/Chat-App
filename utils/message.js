// Third Party Module
const moment = require('moment');

// Generate message to object form
const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: moment().valueOf(),
});

// Generate location message to object form
const generateLocationMessage = (from, lat, long) => ({
  from,
  url: `https://www.google.com/maps?q=${lat},${long}`,
  createdAt: moment().valueOf(),
});

// Export modules
module.exports = {
  generateMessage,
  generateLocationMessage,
};
