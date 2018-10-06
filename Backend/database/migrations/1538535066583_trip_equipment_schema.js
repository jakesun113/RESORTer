'use strict'

const Schema = use('Schema')
//FIXME: remove "Outfit" and "Helmet" column
class TripEquipmentSchema extends Schema {
  up() {
    this.create('trip_equipments', (table) => {
      table.increments()
      table.timestamps()
      table.integer('TripID').unsigned().notNullable().references('id').inTable('trips')
      table.string('MemberType')
      table.integer('MemberID')
      table.mediumtext('RentInfo')
      // table.boolean('SkiBoots')
      // table.boolean('SkiPoles')
      // table.string('SkiGrade', 30)
      // table.boolean('SnowboardBoots')
      // table.boolean('SnowboardBoard')
      // table.string('SnowboardGrade', 30)
      // table.boolean('TelemarkBoots')
      // table.boolean('TelemarkPoles')
      // table.string('TelemarkGrade', 30)
      // table.date('Date')
      // table.string('Duration', 20)
      table.string('Outfit', 30)
      table.string('Helmet', 30)
      table.smallint('ShoeSize')
      table.smallint('Height')
      table.smallint('Weight')
    })
  }

  down() {
    this.drop('trip_equipments')
  }
}

module.exports = TripEquipmentSchema
