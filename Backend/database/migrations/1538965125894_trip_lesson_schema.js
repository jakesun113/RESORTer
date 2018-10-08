'use strict'

const Schema = use('Schema')

class TripLessonSchema extends Schema {
  up() {
    this.create('trip_lessons', (table) => {
      table.increments();
      table.timestamps();
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')


    })
  }

  down() {
    this.drop('trip_lessons')
  }
}

module.exports = TripLessonSchema
