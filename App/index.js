const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

// Middleware for logging
const logger = require('./logger');
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Simple Calculator API');
});

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) + parseFloat(num2);
  res.send(`Result: ${result}`);
});

app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  const result = parseFloat(num1) - parseFloat(num2);
  res.send(`Result: ${result}`);
});

// Mount the metrics router to expose Prometheus metrics
const metricsRouter = require('./metrics');
app.use(metricsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
