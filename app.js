// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.set('puerto', process.env.PORT || 3000);
app.set('nombreApp', 'Gestión de empleados');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/empleados', require('./routes/empleados.routes'));

app.get('/', (req, res) => {
  res.json({ message: 'GRAPHQL Empleados' });
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = app;
