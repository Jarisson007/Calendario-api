//Exemplo de migração para o MySQL
// migrations/create_tables.js

exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.integer('cpf').notNullable().unique();
      table.string('password').notNullable();
      table.enum('role', ['admin', 'student']).defaultTo('student');
    })
    .createTable('events', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.dateTime('data_events');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('events')
    .dropTable('users');
};
