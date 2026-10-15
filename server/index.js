const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', (_req, res) => {
  res.json({ message: 'Привет! Ответ пришёл с Express-сервера.' });
});

module.exports = router;