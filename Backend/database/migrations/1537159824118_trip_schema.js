'use strict';

const Schema = use('Schema');

class TripSchema extends Schema {
  up() {
    this.create('trips', (table) => {
      table.increments()
      table.timestamps()
      table.integer('ResortID').unsigned().notNullable().references('id').inTable('resort_infos')
      table.integer('MasterMemberID').unsigned().notNullable().references('id').inTable('members')
      table.boolean('IsTripDone').defaultTo(false)
      table.date('SubmitDate')
      table.boolean('IsMasterMemberGoing')
      table.string('GroupMemberIDs')
      table.date('StartDate')
      table.date('EndDate')
    })
  }

  down() {
    this.drop('trips')
  }
}

module.exports = TripSchema
