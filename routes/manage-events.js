// essa rota é para gerenciamento de eventos

// routes/manage-events.js

const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/create', async (req, res) => {
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

// Rota para editar um evento
router.put('/edit/:eventId', async (req, res) => {
  const eventId = req.params.eventId;
  const { title, month, day, year, user_id } = req.body;

  if (!title || !month || !day || !year || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Verifica se o evento existe
    const existingEvent = await knex('events').where('id', eventId).first();

    if (!existingEvent) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    // Atualiza o evento
    await knex('events').where('id', eventId).update({ title, month, day, year, user_id });

    res.json({ id: eventId, title, month, day, year, user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para excluir um evento
router.delete('/delete/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Verifica se o evento existe
    const existingEvent = await knex('events').where('id', eventId).first();

    if (!existingEvent) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    // Exclui o evento
    await knex('events').where('id', eventId).del();

    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* A rota "/edit/":eventId' permite editar um evento existente.
O ID do evento é passado como parte da URL (/edit/1, por exemplo)
A rota '/delete/:eventId' permite excluir um evento existente. 
O ID do evento é passado como parte da URL (/delete/1 , por exemplo) */


module.exports = router;
