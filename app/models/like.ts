import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'
import {DateTime} from 'luxon'

import Comment from './comment.js'
import User from './user.js'

export default class Like extends BaseModel {
  public static table =
      'likes'

      @column({isPrimary : true}) declare id: number

      @column() declare userId: number

      @column() declare commentId: number

      @column.dateTime({autoCreate : true}) declare createdAt: DateTime

      // ===== Relations =====

      @belongsTo(() => User, {foreignKey : 'userId'}) declare user:
          BelongsTo<typeof User>

      @belongsTo(() => Comment, {foreignKey : 'commentId'}) declare comment:
          BelongsTo<typeof Comment>
}
