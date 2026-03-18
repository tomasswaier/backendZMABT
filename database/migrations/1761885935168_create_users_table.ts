import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
    table.string('full_name').nullable()
    table.string('email', 254).notNullable().unique()
    table.string('password').notNullable()
    table.string('bio', 250).notNullable().defaultTo('')
    table.string('profile_picture_path').nullable()
    table.unique(
        [
          'username',
          'email',
        ],
        {
          indexName : 'unq_users_username',
        })

    table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
