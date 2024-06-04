module.exports = {
  languageOptions: {
    globals: {
      Node: true, // Define your global variables here (e.g., Node for Node.js)
    },
  },
  rules: {
    'no-undef': 'error', // Remove the reference to structuredClone
  },
};
