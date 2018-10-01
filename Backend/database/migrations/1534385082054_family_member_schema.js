'use strict';

const Schema = use('Schema');

class FamilyMemberSchema extends Schema {
  up() {
    this.create('family_members', (table) => {
      table.increments();
      table.timestamps();
      table.string('FirstName').notNullable();
      table.string('LastName').notNullable();
      table.string('Gender').notNullable();
      table.date('DOB').notNullable(); // format:'YYYY-MM-DD'
      table.tinyint('SkiAbility').notNullable();
      table.tinyint('SnowboardAbility').notNullable();
      table.tinyint('TelemarkAbility').notNullable();
      table.tinyint('SnowbikeAbility').notNullable();
      table.tinyint('SnowmobileAbility').notNullable();
      table.tinyint('SnowshoeAbility').notNullable();
      table.boolean('IsDisabled').notNullable();
      table.string('DisabilityMembership');
      table.string('DisabilityMembershipID');
      table.text('DisabilityDetail');
      table.boolean('IsFoodAllergic');
      table.text('FoodAllergyDetail');
      table.binary('Portrait');
      table.integer('MemberID').unsigned().references('id').inTable('members'); // come back later, foreign key, one to many
      table.string('Owner'); // owner is the id of Master user (required by WIX), may be optional in our implementation
    })
  }

  down() {
    this.drop('family_members')
  }
}

module.exports = FamilyMemberSchema
