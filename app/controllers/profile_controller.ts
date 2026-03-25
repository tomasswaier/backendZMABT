import UserTransformer from '#transformers/user_transformer'
import type {HttpContext} from '@adonisjs/core/http'

export default class ProfileController {
  async show({auth, serialize}: HttpContext) {
    console.log("bigger")
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }
}
