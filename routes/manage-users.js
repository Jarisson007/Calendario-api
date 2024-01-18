// Rota de gerenciamento de usuarios

// routes/manage-users.js

const express = require('express');
const router = express.Router();
const db = require('../database');

// Implemente rotas para obter, adicionar, editar e excluir usuários (apenas para o administrador)

// Rota para obter todos os usuários (apenas para o administrador)
router.get('/all', async (req, res) => {
    try {
      // Verifica se o usuário autenticado é um administrador (você deve implementar essa verificação)
      const isAdmin = true; // Substitua isso pela lógica real de verificação de administrador
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
  
      const users = await knex('users').select('*');
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para adicionar um novo usuário (apenas para o administrador)
  router.post('/add', async (req, res) => {
    // Dados do novo usuário a serem recebidos do corpo da requisição
    const { email, cpf, password, role } = req.body;
  
    try {
      // Verifica se o usuário autenticado é um administrador (você deve implementar essa verificação)
      const isAdmin = true; // Substitua isso pela lógica real de verificação de administrador
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
  
      // Adiciona um novo usuário
      const newUser = await knex('users').insert({ email, cpf, password, role });
      res.status(201).json({ id: newUser[0], email, cpf, role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para editar um usuário existente (apenas para o administrador)
  router.put('/edit/:userId', async (req, res) => {
    const userId = req.params.userId;
    // Dados do usuário a serem recebidos do corpo da requisição
    const { email, cpf, password, role } = req.body;
  
    try {
      // Verifica se o usuário autenticado é um administrador (você deve implementar essa verificação)
      const isAdmin = true; // Substitua isso pela lógica real de verificação de administrador
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
  
      // Verifica se o usuário a ser editado existe
      const existingUser = await knex('users').where('id', userId).first();
  
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Edita o usuário
      await knex('users').where('id', userId).update({ email, cpf, password, role });
  
      res.json({ id: userId, email, cpf, role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Rota para excluir um usuário existente (apenas para o administrador)
  router.delete('/delete/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Verifica se o usuário autenticado é um administrador (você deve implementar essa verificação)
      const isAdmin = true; // Substitua isso pela lógica real de verificação de administrador
  
      if (!isAdmin) {
        return res.status(403).json({ error: 'Acesso não autorizado' });
      }
  
      // Verifica se o usuário a ser excluído existe
      const existingUser = await knex('users').where('id', userId).first();
  
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Exclui o usuário
      await knex('users').where('id', userId).del();
  
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

/*
A rota '/all' retorna todos os usuários (apenas para o administrador).
A rota '/add' adiciona um novo usuário (apenas para o administrador).
A rota '/edit/:userId' edita um usuário existente (apenas para o administrador). 
O ID do usuário é passado como parte da URL.
A rota '/delete/:userId' exclui um usuário existente (apenas para o administrador). 
O ID do usuário é passado como parte da URL.
*/


module.exports = router;
