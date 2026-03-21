import Post from "#models/post";
import type {HttpContext} from '@adonisjs/core/http'

export default class PostsController {
  async getPosts({response}: HttpContext) {
    try {
      const groups = await Post.query().orderBy('created_at', 'desc').limit(10);
      console.log(groups);
      return response.ok(groups);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load groups"});
    }
  }
  async getUserPosts({auth, response}: HttpContext) {
    try {
      const user = auth.use("api").user;
      if (user == undefined) {
        return response.internalServerError(
            {message : "User is not authenticated"});
      }
      const posts = await user!.related('posts')
                        .query()
                        .orderBy('created_at', 'desc')
                        .limit(10)
      console.log(posts);
      return response.ok(posts);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load groups"});
    }
  }
  async store({request, response}: HttpContext) {
    // const user = auth.use("api").user;
    console.log(request);
    try {

      return response.ok("ok");
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load groups"});
    }
  }
}
