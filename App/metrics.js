const express = require('express');
const prometheus = require('prom-client');
const router = express.Router();

// Prometheus metrics
const httpRequestCounter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status'],
});

router.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, res.statusCode).inc();
  });
  next();
});

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  try {
    const metrics = await prometheus.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err.message);
  }
});

module.exports = router;
