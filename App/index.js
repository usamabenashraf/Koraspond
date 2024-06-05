const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

// Middleware for logging
const logger = require('./logger');
app.use(logger);

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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
