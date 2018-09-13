'use strict'

const Schema = use('Schema')

class ResortLiftpassSchema extends Schema {
  up() {
    this.create('resort_liftpasses', (table) => {
      table.increments()
      table.timestamps()
      table.string('ResortWixID').references('WixID').inTable('resort_infos')
      table.string('LiftpassWixID').references('WixID').inTable('liftpasses')
    })
  }

  down() {
    this.drop('resort_liftpasses')
  }
}

module.exports = ResortLiftpassSchema
