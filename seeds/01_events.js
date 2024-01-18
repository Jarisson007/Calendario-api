// seeds/01_events.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('events').del()
      .then(function () {
        // Inserts seed entries
        return knex('events').insert([
          { title: 'Evento Inicial', month: 1, day: 1, year: 2024, user_id: 1 },
          // Adicione mais eventos conforme necessário
        ]);
      });
  };
  