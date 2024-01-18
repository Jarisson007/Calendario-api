// routes/events.js

// Essa rota será para consultar os eventos

const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/all', async (req, res) => {
  try {
    const events = await knex('events').select('*');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/byMonth/:month', async (req, res) => {
  const { month } = req.params;
  try {
    const events = await knex('events').where('month', month).select('*');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
