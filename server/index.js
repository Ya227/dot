const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/test', (_req, res) => {
  res.json({
    message: 'Соединение с Express работает.',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
