// routes/auth.js

//Rota de autenticação de usuario

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');

router.post('/login', async (req, res) => {
  const { email, cpf, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await knex('users').where({ email, cpf, password }).first();

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar um token de acesso
    const token = jwt.sign({ userId: user.id, role: user.role }, 'secreto', { expiresIn: '1h' });

    // Retornar o token de acesso em caso de sucesso
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
