const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  console.log(logMessage); // Just for demonstration
  next();
});

module.exports = router;
