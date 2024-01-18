const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

app.get('/users', (request, response) => {
    connection.query('SELECT * FROM users', (error, data) => {
        if (error) {
            console.error(error);
            response.status(500).send('Error retrieving users');
        } else {
            response.send(data);
        }
    });
});

app.post('/users', (request, response) => {
    const { name, email, cpf } = request.body; // Adicione "cpf" aqui
    connection.query('INSERT INTO users (name, email, cpf) VALUES (?, ?, ?)', [name, email, cpf], (error) => {
        if (error) {
            console.error(error);
            response.status(500).send('Error creating user');
        } else {
            response.send('User created successfully');
        }
    });
});

app.put('/users/:id', (request, response) => { // Corrija o typo e ajuste a rota
    const { id } = request.params;
    const { name, email, cpf } = request.body;
    connection.query('UPDATE users SET name = ?, email = ?, cpf = ? WHERE id = ?', [name, email, cpf, id], (error) => {
        if (error) {
            console.error(error);
            response.status(500).send('Error updating user');
        } else {
            response.send('User updated successfully');
        }
    });
});

app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            response.status(500).send('Error deleting user');
        } else {
            response.send('User deleted successfully');
        }
    });
});
