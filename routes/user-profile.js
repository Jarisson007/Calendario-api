// Aqui é a rota de perfil do usuário

// routes/user-profile.js

const express = require('express');
const router = express.Router();
const db = require('../database');

// Rota para obter informações do perfil do usuário logado
router.get('/', async (req, res) => {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
  
    try {
      // Busca as informações do perfil do usuário pelo ID
      const userProfile = await knex('users').where('id', userId).first();
  
      if (!userProfile) {
        return res.status(404).json({ error: 'Perfil de usuário não encontrado' });
      }
  
      // Retorna as informações do perfil
      res.json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Rota para editar informações do perfil do usuário logado
router.put('/', async (req, res) => {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    // Dados do perfil a serem recebidos do corpo da requisição
    const { email, cpf, password } = req.body;
  
    try {
      // Verifica se o usuário a ser editado existe
      const existingUser = await knex('users').where('id', userId).first();
  
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Atualiza as informações do perfil
      await knex('users').where('id', userId).update({ email, cpf, password });
  
      // Retorna as novas informações do perfil
      const updatedUserProfile = await knex('users').where('id', userId).first();
      res.json(updatedUserProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  /*
  Na rota '/get', obtemos o ID do usuário autenticado a partir do objeto 'req.user'
  (assumindo que você está usando alguma estratégia de autenticação, como JWT).
  Em seguida, buscamos as informações do perfil do usuário no banco de dados e as retornamos.
  Na rota '/put', também obtemos o ID do usuário autenticado.
  Verificamos se o usuário existe no banco de dados
  Atualizamos as informações do perfil e retornamos as novas informações.
  */
module.exports = router;
