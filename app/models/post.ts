import {BaseModel, belongsTo, column, hasMany} from '@adonisjs/lucid/orm'
import type {BelongsTo, HasMany} from "@adonisjs/lucid/types/relations";
import {DateTime} from 'luxon'

import Comment from './comment.js'
import Place from './place.js'
import PostImage from './post_image.js'
import Rating from './rating.js'
import User from './user.js'

export default class Post extends BaseModel {
  public static table =
      'posts'

      @column({isPrimary : true}) declare id: number

      @column() declare userId: number

      @column() declare placeId: number

      @column() declare description: string

      @column
          .dateTime({autoCreate : true}) declare createdAt: DateTime

      @column.dateTime({autoCreate : true, autoUpdate: true}) declare updatedAt
      ?: DateTime|null

      // ===== Relations =====
      @belongsTo(() => User, {foreignKey : 'userId'}) declare user:
          BelongsTo<typeof User>;
  //
  @belongsTo(() => Place, {foreignKey : 'placeId'})
  declare place: BelongsTo<typeof Place>;
  //
  @hasMany(() => Comment, {foreignKey : 'postId'})
  declare comments: HasMany<typeof Comment>;
  //
  @hasMany(() => PostImage, {foreignKey : 'postId'})
  declare images: HasMany<typeof PostImage>;
  //
  @hasMany(() => Rating, {foreignKey : 'postId'})
  declare ratings: HasMany<typeof Rating>
}
