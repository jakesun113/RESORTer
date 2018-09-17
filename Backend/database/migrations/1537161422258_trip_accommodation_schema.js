'use strict'

const Schema = use('Schema')

class TripAccommodationSchema extends Schema {
  up() {
    this.create('trip_accommodations', (table) => {
      table.increments()
      table.timestamps()
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')
      table.string('AccoType')
      table.string('AccoCate')
      table.smallint('NumOfAdults')
      table.smallint('NumOfChildren')
      table.smallint('NumOfToddlers')
      table.smallint('NumOfBathroom')
      table.smallint('NumOfBedroom')
      table.text('Requirement')
    })
  }

  down() {
    this.drop('trip_accommodations')
  }
}

module.exports = TripAccommodationSchema
