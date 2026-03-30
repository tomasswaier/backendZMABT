import Place from "#models/place";
import Post from "#models/post";
import User from "#models/user";
import {
  postGetPageValidator,
  postGetUserValidator,
  postGetValidator,
  postStoreValidator
} from "#validators/post";
import type {HttpContext} from '@adonisjs/core/http'

export default class PostsController {
  async getPost({request, response}: HttpContext) {
    console.log("nigger")
    const data = await request.validateUsing(postGetValidator)
    try {
      const post = await Post.find(data.postId)
      /*const comments =
          await post!.related('comments').query().orderBy("updated_at",
         "desc")*/
      return response.ok(post);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load post"});
    }
  }
  async getPosts({request, response}: HttpContext) {
    const data = await request.validateUsing(postGetPageValidator)
    try {
      const user = await User.find(data.userId)
      const posts = await this.getPostData(user!, data.page)
      return response.ok(posts);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load posts"});
    }
  }
  async getPostsFyp({request, response}: HttpContext) {
    const data = await request.validateUsing(postGetUserValidator)
    try {
      const posts = await Post.query()
                        .orderBy('updated_at', 'desc')
                        .paginate(data.page, 10)

      return response.ok(posts);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load posts"});
    }
  }
  async getUserPosts({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(postGetUserValidator)
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({message : 'User not authenticated'})
      }
      const posts = await this.getPostData(user, data.page)

      return response.ok(posts)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({message : 'Failed to load posts'})
    }
  }
  getPostData(user: User, page: number) {
    return user.related('posts')
        .query()
        .orderBy('created_at', 'desc')
        .paginate(page, 10)
  }

  async store({request, response, auth}: HttpContext) {
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to upload post", error : true});
    }
    console.log(request);
    try {
      const data = await request.validateUsing(postStoreValidator)
      const aiDescription =
          "placeholder description till we implement the ai feature"
      const place = await Place.create({
        aiDescription : aiDescription,
        latitude : data.latitude,
        longitude : data.longitude
      });
      await Post.create({
        description : data.postText,
        stars : data.rating,
        placeId : place.id,
        userId : user.id
      })

      return response.ok({error : false, message : "post successfully posted"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError(
          {message : "Failed to load groups", error : true});
    }
  }
}
