'use strict'

const Schema = use('Schema')

class TripLiftpassSchema extends Schema {
  up() {
    this.create('trip_liftpasses', (table) => {
      table.increments()
      table.timestamps()
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')
      table.text('Comment')
      table.boolean('IsRemoved')
      table.mediumtext('LiftpassInfo')
      // table.date('Date')
      // table.smallint('AdultNumber')
      // table.string('AdultDuration', 20)
      // table.smallint('ChildNumber')
      // table.string('ChildDuration', 20)
    })
  }

  down() {
    this.drop('trip_liftpasses')
  }
}

module.exports = TripLiftpassSchema
