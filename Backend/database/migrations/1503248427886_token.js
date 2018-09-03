'use strict';

const Schema = use('Schema');

class TokensSchema extends Schema {
  up() {
    this.create('tokens', (table) => {
      table.increments();
      table.integer('user_ID').unsigned().references('id').inTable('users');
      table.string('Token', 255).notNullable().unique().index();
      table.string('Type', 80).notNullable();
      table.string('Email');
      table.integer('ExpireTime');
      table.boolean('IsRevoked').defaultTo(false);
      table.timestamps();
    })
  }

  down() {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
