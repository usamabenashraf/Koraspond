const express = require('express');
const router = express.Router();
const fluentLogger = require('fluent-logger');

// Configure Fluentd logger
fluentLogger.configure('yourTag', {
  host: 'yourFluentdHost',
  port: 24224, // Default Fluentd port
  timeout: 3.0,
});

router.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  fluentLogger.emit('http_requests', { message: logMessage });
  next();
});

module.exports = router;
