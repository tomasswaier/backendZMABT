import {BaseModel, belongsTo, column, hasMany} from '@adonisjs/lucid/orm'
import type {BelongsTo, HasMany} from "@adonisjs/lucid/types/relations";
import {DateTime} from 'luxon'

import Post from './post.js'
import User from './user.js'

export default class Comment extends BaseModel {
  public static table =
      'comments'

      @column({isPrimary : true}) declare id: number

      @column() declare userId: number

      @column() declare postId: number

      @column() declare parentCommentId?: number|null

      @column() declare content: string

      @column
          .dateTime({autoCreate : true}) declare createdAt: DateTime

      @column.dateTime({autoCreate : true, autoUpdate: true}) declare updatedAt
      ?: DateTime|null

      // ===== Relations =====

      @belongsTo(() => User, {foreignKey : 'userId'}) declare user:
          BelongsTo<typeof User>

      @belongsTo(() => Post, {foreignKey : 'postId'}) declare post:
          BelongsTo<typeof Post>

      @belongsTo(() => Comment, {foreignKey : 'parentCommentId'}) declare parent
      ?: BelongsTo<typeof Comment>

      @hasMany(() => Comment, {foreignKey : 'parentCommentId'}) declare replies:
          HasMany<typeof Comment>
}
