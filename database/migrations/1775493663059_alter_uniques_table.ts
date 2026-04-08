import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  async up() {
    this.schema.alterTable(
        this.tableName,
        (table) => {table.unique([ 'follower_id', 'following_id' ], {
          indexName : 'follows_unique_pair',
        })})
  }

  async down() {
    this.schema.alterTable(
        this.tableName,
        (table) => {table.dropUnique([ 'follower_id', 'following_id' ],
                                     'follows_unique_pair')})
  }
}
