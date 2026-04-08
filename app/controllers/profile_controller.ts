import Follow from '#models/follow';
import UserTransformer from '#transformers/user_transformer'
import {followValidator} from "#validators/user";
import type {HttpContext} from '@adonisjs/core/http'

export default class ProfileController {
  async show({auth, serialize}: HttpContext) {
    console.log("bigger")
    return serialize(UserTransformer.transform(auth.getUserOrFail()))
  }
  async follow({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(followValidator)
    const user = auth.user
    if (user == undefined) {
      return response.internalServerError({message : "Error occured"});
    }
    try {
      await Follow.create({followerId : user.id, followingId : data.userId})

      return response.ok({message : "follow saved successfully"})
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to save follow."});
    }
  }
  async unfollow({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(followValidator)
    const user = auth.user
    if (user == undefined) {
      return response.internalServerError({message : "Error occured"});
    }
    try {
      await Follow.query()
          .where("followerId", user.id)
          .where("followingId", data.userId)
          .delete();

      return response.ok({message : "unfollowed successfully"})
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to unfollow."});
    }
  }
}
