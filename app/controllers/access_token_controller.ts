import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import {loginValidator} from '#validators/user'
import type {HttpContext} from '@adonisjs/core/http'
import env from '#start/env'
import { randomBytes } from 'node:crypto'

export default class AccessTokenController {
  async store({request, serialize}: HttpContext) {
    const {username, password} = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(username, password)
    const token = await User.accessTokens.create(user)

    return serialize({
      user : UserTransformer.transform(user),
      token : token.value!.release(),
    })
  }

  async googleLogin({request, response, serialize}: HttpContext) {
    const idToken = request.input('idToken')

    if (!idToken) {
      return response.badRequest({message : 'idToken is required'})
    }

    const googleResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    )

    if (!googleResponse.ok) {
      return response.unauthorized({message : 'Invalid Google token'})
    }

    const payload = await googleResponse.json() as {
      sub: string
      email: string
      aud: string
    }

    if (payload.aud !== env.get('GOOGLE_CLIENT_ID')) {
      return response.unauthorized({message : 'Token audience mismatch'})
    }

    let user = await User.query().where('googleId', payload.sub).first()

    if (!user) {
      user = await User.query().where('email', payload.email).first()
      if (user) {
        user.googleId = payload.sub
        await user.save()
      } else {
        const baseUsername = payload.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_')
        let username = baseUsername
        let counter = 1
        while (await User.query().where('username', username).first()) {
          username = `${baseUsername}${counter++}`
        }
        user = await User.create({
          email: payload.email,
          googleId: payload.sub,
          username,
          password: randomBytes(32).toString('hex'),
          bio: '',
        })
      }
    }

    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async destroy({auth}: HttpContext) {
    const user = await auth.use('api').authenticate()

    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return { message: 'Logged out successfully' }
  }
}
