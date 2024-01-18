const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bd_softex'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});

module.exports = connection;

const connection = require('./database');

// Exemplo de consulta para a tabela 'users'
connection.query('SELECT * FROM users', (error, results, fields) => {
  if (error) {
    console.error('Erro na consulta:', error.message);
  } else {
    console.log('Resultados da consulta na tabela "users":', results);
  }

  // Certifique-se de fechar a conexão após a conclusão da consulta
  connection.end((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão:', err.message);
    } else {
      console.log('Conexão fechada com sucesso');
    }
  });
});


// Exemplo de consulta para a tabela 'events'
connection.query('SELECT * FROM events', (error, results, fields) => {
    if (error) {
      console.error('Erro na consulta:', error.message);
    } else {
      console.log('Resultados da consulta na tabela "events":', results);
    }
  
    // Certifique-se de fechar a conexão após a conclusão da consulta
    connection.end((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão:', err.message);
      } else {
        console.log('Conexão fechada com sucesso');
      }
    });
  });

  // Exemplo de consulta para a tabela 'cadastrar_usuario'
connection.query('SELECT * FROM cadastrar_usuario', (error, results, fields) => {
    if (error) {
      console.error('Erro na consulta:', error.message);
    } else {
      console.log('Resultados da consulta na tabela "cadastrar_usuario":', results);
    }
  
    // Certifique-se de fechar a conexão após a conclusão da consulta
    connection.end((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão:', err.message);
      } else {
        console.log('Conexão fechada com sucesso');
      }
    });
  });