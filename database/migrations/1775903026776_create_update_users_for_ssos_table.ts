import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password').nullable().alter()
    table.string('auth_provider').defaultTo('local')

    table.string('provider_user_id').nullable()

    table.string('email').notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['email'])
    table.dropColumn('auth_provider')
    table.dropColumn('provider_user_id')

      table.string('password').notNullable().alter()
    })
  }
}
