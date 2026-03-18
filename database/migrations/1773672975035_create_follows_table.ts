import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

table.increments('id').primary()

    table.integer('follower_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.integer('following_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamp('created_at', {useTz : true}).notNullable()
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
