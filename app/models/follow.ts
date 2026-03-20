import {BaseModel, belongsTo, column} from '@adonisjs/lucid/orm'
import type {BelongsTo} from "@adonisjs/lucid/types/relations";
import {DateTime} from 'luxon'

import User from './user.js'

export default class Follow extends BaseModel {
  public static table = 'follows'

                        @column({isPrimary : true}) declare id: number

                        @column() declare followerId: number

                        @column() declare followingId: number

                        @column.dateTime({autoCreate : true}) declare createdAt:
                            DateTime;
  @belongsTo(() => User, {foreignKey : 'followerId'})
  declare follower: BelongsTo<typeof User>;
  @belongsTo(() => User, {foreignKey : 'followingId'})
  declare following: BelongsTo<typeof User>
}
