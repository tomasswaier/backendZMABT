import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ratings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

    table.increments('id').primary()

    table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')

    table.integer('stars').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
