import {BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import type {HasMany} from '@adonisjs/lucid/types/relations'
import {DateTime} from 'luxon'

import Post from './post.js'

export default class Place extends BaseModel {
  public static table = 'places'

                        @column({isPrimary : true}) declare id: number

                        @column() declare latitude: number

                        @column() declare longitude: number

                        @column() declare aiDescription: string

                        @column.dateTime({autoCreate : true}) declare createdAt:
                            DateTime

                        // ===== Relations =====

                        @hasMany(() => Post,
                                 {foreignKey : 'placeId'}) declare posts:
                            HasMany<typeof Post>
}
