// routes/calendar.js

const express = require('express');
const router = express.Router();
const db = require('../database');

module.exports = function(db) {
    // Rota para obter todos os eventos
    router.get('/events', async (req, res) => {
      try {
        const events = await db('events').select('*');
        res.json(events);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });

// Rota para criar um novo evento
router.post('/events', async (req, res) => {
  const { title, month, day, year, user_id } = req.body;

  if (!title || !month || !day || !year || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newEvent = await knex('events').insert({ title, month, day, year, user_id });
    res.status(201).json({ id: newEvent[0], title, month, day, year, user_id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para excluir um evento
router.delete('/events/:id', async (req, res) => {
    const eventId = req.params.id;
  
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
  
    try {
      const event = await knex('events').where({ id: eventId }).first();
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Verifica se o usuário tem permissão para excluir (exemplo: aluno não pode excluir eventos do administrador)
    
      if (event.user_id !== req.user.id) {
        return res.status(403).json({ error: 'Permission denied' });
      }
  
      await knex('events').where({ id: eventId }).del();
      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para criar um novo evento pelo aluno
  router.post('/student/events', async (req, res) => {
    const { title, month, day, year, user_id } = req.body;
  
    if (!title || !month || !day || !year || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      //  Aqui podemos adcionar uma logica adicional, por exemplo, verificar se o aluno existe, etc.
      const newEvent = await knex('events').insert({ title, month, day, year, user_id });
      res.status(201).json({ id: newEvent[0], title, month, day, year, user_id });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// Rota temporária para adicionar dados ao banco de dados
router.post('/addTestData', async (req, res) => {
    try {
      await knex('events').insert({
        title: 'Evento de Teste',
        month: 1,
        day: 15,
        year: 2024,
        user_id: jarisson // 
      });
  
      res.status(201).json({ message: 'Test data added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Adicione mais rotas conforme necessário...

return router;
};
