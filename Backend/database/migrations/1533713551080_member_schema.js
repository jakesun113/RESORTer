'use strict';

const Schema = use('Schema');

class MemberSchema extends Schema {
  up() {
    // this.create('members', (table) => {
    //   table.increments();
    //   table.timestamps();
    //   table.string('Token').notNullable().unique();
    //   table.string('Provider').notNullable();
    //   table.string('Email').notNullable().unique();
    //   table.string('EncryptedPW').notNullable();
    //   table.string('Firstname').notNullable();
    //   table.string('Lastname').notNullable();
    //   table.string('Gender').notNullable();
    //   table.string('PhoneAreaCode');
    //   table.string('PhoneNumber');
    //   table.date('DOB').notNullable();
    //   table.string('Country');
    //   table.string('Postcode');
    //   table.boolean('IsDisabled').notNullable();
    //   table.text('DisabilityDetail');
    //   table.tinyint('SkiAbility').notNullable();
    //   table.tinyint('SnowboardAbility').notNullable();
    //   table.tinyint('TelemarkAbility').notNullable();
    //   table.tinyint('SnowbikeAbility').notNullable();
    //   table.tinyint('SnowmobileAbility').notNullable();
    //   table.tinyint('SnowshoeAbility').notNullable();
    //   table.binary('Portrait');
    //   table.boolean('IsActive');
    // })
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
      table.binary('Portrait');
      table.boolean('IsActive').notNullable();
      table.boolean("IsProfileComplete");
    })
  }

  down() {
    this.drop('members')
  }
}

module.exports = MemberSchema;
