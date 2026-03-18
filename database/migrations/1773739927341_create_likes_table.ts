import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

    table.increments('id').primary()

    table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.integer('comment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')

    table.timestamp('created_at', {useTz : true}).notNullable()

    // Prevent duplicate likes
      table.unique(['user_id', 'comment_id'], {
        indexName: 'unq_likes_user_comment',
      })
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
