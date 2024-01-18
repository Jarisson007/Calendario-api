// app.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('database');
const cors = require('cors');
const connection = require('./db')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', testRoutes);


// Conexões para as rotas
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const manageEventsRoutes = require('./routes/manage-events');
const notesRoutes = require('./routes/notes');
const manageUsersRoutes = require('./routes/manage-users');
const userProfileRoutes = require('./routes/user-profile');

// Usar as rotas no aplicativo
app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);
app.use('/manage-events', manageEventsRoutes);
app.use('/notes', notesRoutes);
app.use('/manage-users', manageUsersRoutes);
app.use('/user-profile', userProfileRoutes);

/*
// importando as rotas aqui...
const calendarRoutes = require('./routes/calendar');

// usando as rotas
app.use('/api', calendarRoutes(db));
*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
