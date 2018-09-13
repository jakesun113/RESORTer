'use strict'

const Schema = use('Schema')

class LiftpassSchema extends Schema {
  up() {
    this.create('liftpasses', (table) => {
      table.increments();
      table.timestamps();
      table.string('Name').unique().notNullable();
      table.string('WixID').unique().notNullable();
    })
  }

  down() {
    this.drop('liftpasses')
  }
}

module.exports = LiftpassSchema
