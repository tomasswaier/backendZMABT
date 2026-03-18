import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id').primary()

    table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.integer('place_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('places')
        .onDelete('CASCADE')

    table.string('description', 5000).notNullable()

    table.timestamp('created_at', {useTz : true}).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()

    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
