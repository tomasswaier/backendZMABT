import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import {signupValidator} from '#validators/user'
import type {HttpContext} from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'
import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export default class NewAccountController {
  async store({request, serialize}: HttpContext) {
    const {username, email, password} =
        await request.validateUsing(signupValidator)

    const user = await User.create({
      username : username,
      email : email,
      password : password,
      bio : "",
      profilePicturePath : null
    })
    const token = await User.accessTokens.create(user)

    return serialize({
      user : UserTransformer.transform(user),
      token : token.value!.release(),
    })
  }
  async google({request, response}: HttpContext) {
    try {
      // vibe coded bcs no time and idk how much I need to do
      const {idToken} = request.only([ 'idToken' ])

      if (!idToken) {
        console.log("id token not provided")
        return response.badRequest({error : true, message : 'Missing token'})
      }
      else {console.log("id token provided")}

      console.log(process.env.GOOGLE_CLIENT_ID)
      const ticket = await client.verifyIdToken({
        idToken,
        audience : process.env.GOOGLE_CLIENT_ID,

      })

      const payload = ticket.getPayload()

      if (!payload || !payload.email) {
        return response.badRequest(
            {error : true, message : 'Invalid token payload'})
      }

      const email = payload.email
      const name = payload.name || 'user'
      const providerUserId = payload.sub

      let user = await User.query().where('email', email).first()

      if (!user) {
        let username = name.replace(/\s+/g, '').toLowerCase()

        const existing = await User.query().where('username', username).first()
        if (existing) {
          username = `${username}_${Math.floor(Math.random() * 10000)}`
        }

        user = await User.create({
          email,
          username,
          password : null,
          bio : '',
        })
      }

      await Database.table('user_identities')
          .insert({
            user_id : user.id,
            provider : 'google',
            provider_user_id : providerUserId,
          })
          .onConflict([ 'provider', 'provider_user_id' ])
          .ignore()

      const token = await User.accessTokens.create(user)

      return response.ok({
        error : false,
        data : {
          token : token.value!.release(),
          user : user,
        },
      })

    } catch (error) {
      console.error(error)
      return response.internalServerError({
        error : true,
        message : 'SSO login failed',
      })
    }
  }
}
