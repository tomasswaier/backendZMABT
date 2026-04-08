import Post from "#models/post";
import Rating from "#models/rating";
import User from "#models/user";
import PostService from '#services/post_service'
import {
  postGetPagePlacesValidator,
  postGetPageValidator,
  postGetProfilePageValidator,
  postGetValidator,
  postRateValidator,
  postStoreValidator
} from "#validators/post";
import type {HttpContext} from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class PostsController {
  async getPost({request, response}: HttpContext) {
    const data = await request.validateUsing(postGetValidator)
    try {
      const post = await Post.find(data.postId)
      const postImages = await post!.related('images').query()
      return response.ok({"post" : post, "postImages" : postImages});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load post"});
    }
  }
  async getPosts({request, response}: HttpContext) {
    const data = await request.validateUsing(postGetProfilePageValidator)
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
    const data = await request.validateUsing(postGetPageValidator)
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
  async getPostsPlace({request, response}: HttpContext) {
    const data = await request.validateUsing(postGetPagePlacesValidator)
    try {
      const posts = await Post.query()
                        .where("placeId", data.placeId)
                        .orderBy('updated_at', 'desc')
                        .paginate(data.page, 10)

      return response.ok(posts);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load posts"});
    }
  }
  async getUserPosts({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(postGetPageValidator)
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
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized(
          {message : 'Not authenticated', error : true})
    }

    try {
      const data = await request.validateUsing(postStoreValidator)
      const image = request.file('image')

      const post =
          await PostService.createPost(user, data, image ? image : undefined)

      return response.ok({post})
    } catch (error) {
      return response.internalServerError({message : 'Failed to create post'})
    }
  }
  async delete({request, response, auth}: HttpContext) {
    const data = await request.validateUsing(postGetValidator)
    try {
      const post = await Post.find(data.postId)
      if (!post) {
        return response.ok({"message" : "Post with that id does not exist"});
      }
      if (auth.user && post.userId != auth.user.id) {
        return response.ok({"message" : "This post can not be deleted by you"});
      }

      const postImages = await post!.related('images').query()
      postImages.forEach(postImage => {
        const fileName = postImage.imagePath;

        drive.use('fs').delete(`${fileName}`);
      });
      post.delete()
      return response.ok({"message" : "Post delete successfully"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load post"});
    }
  }
  async rate({request, response, auth}: HttpContext) {
    const data = await request.validateUsing(postRateValidator)
    try {

      if (!auth.user || !auth.user.id) {
        return response.internalServerError(
            {message : "Failed to put rating, no userId"});
      }
      await Rating.updateOrCreate({userId : auth.user.id, postId : data.postId},
                                  {stars : data.stars});
      var post = await Post.find(data.postId);

      const result = await post!.related('ratings').query().avg('stars as avg');

      const average = Math.round(result[0].$extras.avg);
      post!.merge({stars : average}).save();

      return response.ok({"message" : "rating added successfully"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to add rating"});
    }
  }
}
