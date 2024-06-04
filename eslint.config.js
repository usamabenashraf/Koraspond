module.exports = {
  env: {
    node: true, // Define your environment (e.g., Node.js)
  },
  extends: ['standard'], // Extend from the ESLint Standard preset
  rules: {
    'no-undef': 'error', // Add the no-undef rule with severity 'error'
  },
};
