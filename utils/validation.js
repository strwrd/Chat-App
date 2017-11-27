// Check if str is string and not only whitespaces
const isRealString = str => typeof str === 'string' && str.trim().length > 0;

// Export Modules
module.exports = {
  isRealString,
};
