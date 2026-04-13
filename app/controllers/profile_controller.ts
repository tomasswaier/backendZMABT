import Follow from '#models/follow';
import User from '#models/user';
import UserTransformer from '#transformers/user_transformer'
import {followValidator} from "#validators/user";
import { updateBioValidator } from '#validators/user';
import type {HttpContext} from '@adonisjs/core/http'

export default class ProfileController {
  async show({auth, serialize}: HttpContext) {
    return serialize({user : UserTransformer.transform(auth.getUserOrFail())})
  }
  async get({auth, request, response}: HttpContext) {
    const currentUser = auth.user
    if (currentUser == undefined) {
      return response.internalServerError({message : "Error occured"});
    }
    const data = await request.validateUsing(followValidator)
    const user = await User.find(data.userId)

    const follows = await Follow.query().where("followerId", currentUser!.id)
    var isFollowing = false;
    if (follows.length > 0) {
      isFollowing = true
    }

    return response.ok({user : user, isFollowing : isFollowing})
  }
  async follow({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(followValidator)
    const user = auth.user
    if (user == undefined) {
      return response.internalServerError({message : "Error occured"});
    }

    if (data.userId === user.id) {
      return response.badRequest({
        message: 'You cannot follow yourself',
        error: true,
      })
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

  async updateBio({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        message : 'User not authenticated',
        error : true,
      })
    }

    try {
      const data = await request.validateUsing(updateBioValidator)

      user.bio = data.bio
      await user.save()

      return response.ok({
        message : 'Bio updated successfully',
        error : false,
        data : user,
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message : 'Failed to update bio',
        error : true,
      })
    }
  }
}