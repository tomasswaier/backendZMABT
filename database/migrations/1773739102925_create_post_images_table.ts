import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'post_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

    table.increments('id').primary()

    table.integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')

      table.string('image_path').notNullable()
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
