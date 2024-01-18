// Aqui será a rota de anotações dos alunos

// routes/notes.js

const express = require('express');
const router = express.Router();
const db = require('../database');

// Implemente rotas para obter, criar, editar e excluir anotações

// Rota para obter todas as anotações de um usuário
router.get('/all/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const notes = await knex('notes').where('user_id', userId).select('*');
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para criar uma nova anotação
  router.post('/create', async (req, res) => {
    const { title, content, user_id } = req.body;
  
    if (!title || !content || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const newNote = await knex('notes').insert({ title, content, user_id });
      res.status(201).json({ id: newNote[0], title, content, user_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para editar uma anotação
  router.put('/edit/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, user_id } = req.body;
  
    if (!title || !content || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Verifica se a anotação existe
      const existingNote = await knex('notes').where('id', noteId).first();
  
      if (!existingNote) {
        return res.status(404).json({ error: 'Anotação não encontrada' });
      }
  
      // Atualiza a anotação
      await knex('notes').where('id', noteId).update({ title, content, user_id });
  
      res.json({ id: noteId, title, content, user_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para excluir uma anotação
  router.delete('/delete/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
  
    try {
      // Verifica se a anotação existe
      const existingNote = await knex('notes').where('id', noteId).first();
  
      if (!existingNote) {
        return res.status(404).json({ error: 'Anotação não encontrada' });
      }
  
      // Exclui a anotação
      await knex('notes').where('id', noteId).del();
  
      res.json({ message: 'Anotação excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

/* A rota '/all/:userId' retorna todas as anotações de um usuário específico.
A rota '/create' cria uma nova anotação.
A rota '/edit/:noteId' edita uma anotação existente. O ID da anotação é passado como parte da URL.
A rota '/delete/:noteId' exclui uma anotação existente. O ID da anotação é passado como parte da URL.
*/


module.exports = router;
