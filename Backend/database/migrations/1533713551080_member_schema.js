'use strict';

const Schema = use('Schema');

class MemberSchema extends Schema {
  up() {
    this.create('members', (table) => {
      table.increments();
      table.timestamps();
      table.string('Provider');
      table.string('Email').unique();
      table.string('EncryptedPW');
      table.string('Firstname');
      table.string('Lastname');
      table.string('Gender');
      table.string('PhoneAreaCode');
      table.string('PhoneNumber');
      table.date('DOB');
      table.string('Country');
      table.string('Postcode');
      table.boolean('IsDisabled');
      table.string('DisabilityMembership');
      table.string('DisabilityMembershipID');
      table.text('DisabilityDetail');
      table.tinyint('SkiAbility');
      table.tinyint('SnowboardAbility');
      table.tinyint('TelemarkAbility');
      table.tinyint('SnowbikeAbility');
      table.tinyint('SnowmobileAbility');
      table.tinyint('SnowshoeAbility');
      table.string('Portrait');
      table.boolean('IsActive').notNullable();
      table.boolean("IsProfileComplete").defaultTo(false);
    })
  }

  down() {
    this.drop('members')
  }
}

module.exports = MemberSchema;
