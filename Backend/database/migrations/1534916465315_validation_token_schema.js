'use strict';

const Schema = use('Schema');

class ValidationTokenSchema extends Schema {
  up() {
    this.create('validation_tokens', (table) => {
      table.increments();
      table.integer('MemberID').unsigned().references('id').inTable('members');
      table.string('Token', 255).notNullable().unique();
      table.string('Type', 80).notNullable();
      // table.string('Email');
      table.integer('ExpireTime');
      table.boolean('IsRevoked').defaultTo(false);
      table.timestamps();
    })
  }

  down() {
    this.drop('validation_tokens')
  }
}

module.exports = ValidationTokenSchema
