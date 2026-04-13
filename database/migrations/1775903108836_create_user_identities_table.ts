import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_identities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

    table.integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

    table.string('provider').notNullable()

    table.string('provider_user_id').notNullable()

    table.unique([ 'provider', 'provider_user_id' ])

      table.timestamp('created_at')
    })
  }

  async down() { this.schema.dropTable(this.tableName) }
}
