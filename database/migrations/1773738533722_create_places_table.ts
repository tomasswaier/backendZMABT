import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'places'

  async up() {

    this.schema.createTable(this.tableName, (table) => {

      table.increments('id').primary()

    table.decimal('latitude', 9, 6).notNullable()
    table.decimal('longitude', 9, 6).notNullable()

    table.string('ai_description').notNullable()

    table.timestamp('created_at', {useTz : true}).notNullable()
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
