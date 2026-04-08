import {
  DbAccessTokensProvider,
} from '@adonisjs/auth/access_tokens'
import {withAuthFinder} from '@adonisjs/auth/mixins/lucid'
import {compose} from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import {BaseModel, column, hasMany} from '@adonisjs/lucid/orm'
import type {HasMany} from "@adonisjs/lucid/types/relations";
import {DateTime} from 'luxon'

import Post from './post.js'

const AuthFinder = withAuthFinder(hash, {
  uids : [ 'username' ],
  passwordColumnName : 'password',
})

export default class User extends compose
(BaseModel, AuthFinder) {
  public static table = 'users';

  // Access tokens
  public static accessTokens = DbAccessTokensProvider.forModel(User, {
    table : "auth_access_tokens",
    expiresIn : "30 days",
  });

  @column({isPrimary : true}) declare id: number;

  @column() declare username: string;

  @column() declare email: string;

  @column({serializeAs : null}) declare password: string;

  @column() declare bio: string;

  @column() declare profilePicturePath?: string|null;

  @column
      .dateTime({autoCreate : true}) declare createdAt: DateTime

      @column.dateTime({autoCreate : true, autoUpdate : true})
          declare updatedAt: DateTime|null
      @hasMany(() => Post, {foreignKey : 'userId'}) declare posts:
          HasMany<typeof Post>;
}
