'use strict'

const Schema = use('Schema')

class TripWhodateSchema extends Schema {
  up() {
    this.create('trip_whodates', (table) => {
      table.increments()
      table.timestamps()
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')
      table.boolean('IsMasterMemberGoing')
      table.string('GroupMemberIDs')
      table.date('StartDate')
      table.date('EndDate')
    })
  }

  down() {
    this.drop('trip_whodates')
  }
}

module.exports = TripWhodateSchema
