module.exports = {
  languageOptions: {
    globals: {
      Node: true, // Define your global variables here (e.g., Node for Node.js)
    },
  },
  extends: ['standard'], // Extend from the ESLint Standard preset
  rules: {
    'no-undef': 'error', // Add the no-undef rule with severity 'error'
  },
};
