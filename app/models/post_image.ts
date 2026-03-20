import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'

import Post from './post.js'

export default class PostImage extends BaseModel {
  public static table = 'post_images'

      @column({isPrimary : true}) declare id: number

      @column() declare postId: number

      @column() declare imagePath: string

      // ===== Relations =====

      @belongsTo(() => Post, {foreignKey : 'postId'}) declare post:
          BelongsTo<typeof Post>
}
