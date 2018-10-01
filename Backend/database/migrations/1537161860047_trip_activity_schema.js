'use strict'

const Schema = use('Schema')

class TripActivitySchema extends Schema {
  up() {
    this.create('trip_activities', (table) => {
      table.increments()
      table.timestamps()
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')
      table.text('MasterMemberActivity')
      table.mediumtext('GroupMemberActivity')
    })
  }

  down() {
    this.drop('trip_activities')
  }
}

module.exports = TripActivitySchema
