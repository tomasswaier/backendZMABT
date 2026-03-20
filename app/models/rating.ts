import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'
import {DateTime} from 'luxon'

import Post from './post.js'
import User from './user.js'

export default class Rating extends BaseModel {
  public static table =
      'ratings'

      @column({isPrimary : true}) declare id: number

      @column() declare userId: number

      @column() declare postId: number

      @column() declare stars: number

      @column.dateTime({autoCreate : true}) declare createdAt: DateTime

      // ===== Relations =====

      @belongsTo(() => User, {foreignKey : 'userId'}) declare user:
          BelongsTo<typeof User>

      @belongsTo(() => Post, {foreignKey : 'postId'}) declare post:
          BelongsTo<typeof Post>
}
