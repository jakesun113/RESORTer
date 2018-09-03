'use strict';

const Schema = use('Schema');

class ResortInfoSchema extends Schema {
  up() {
    this.create('resort_infos', (table) => {
      table.increments();
      table.timestamps();
      table.string('Name').notNullable().unique();
      table.decimal('Longitude', 8).notNullable();
      table.decimal('Latitude', 8).notNullable();
      table.string('Image');
      table.text('Description');
      table.boolean('IsOnBoard').notNullable();
      table.string('Logo');
      table.string('Country').notNullable();
      table.string('Continent').notNullable();
      table.string('Union');
      table.string('WixID');
      table.string('Owner');
      table.string('OwnerEmail');
    })
  }

  down() {
    this.drop('resort_infos')
  }
}

module.exports = ResortInfoSchema
