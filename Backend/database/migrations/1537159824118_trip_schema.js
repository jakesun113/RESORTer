'use strict';

const Schema = use('Schema');

class TripSchema extends Schema {
  up() {
    this.create('trips', (table) => {
      table.increments();
      table.timestamps();
      table.integer('ResortID').unsigned().notNullable().references('id').inTable('resort_infos')
      table.integer('MasterMemberID').unsigned().notNullable().references('id').inTable('members')
      table.boolean('IsTripDone').defaultTo(false)
      table.date('SubmitDate')
      table.boolean('IsMasterMemberGoing')
      table.text('GroupMemberIDs')
      table.date('StartDate')
      table.date('EndDate')
      table.text('Comment')
    })
  }

  down() {
    this.drop('trips')
  }
}

module.exports = TripSchema
