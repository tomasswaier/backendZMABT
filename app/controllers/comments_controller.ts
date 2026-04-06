import Comment from "#models/comment";
import {commentPageValidator, commentStoreValidator} from "#validators/comment";
import type {HttpContext} from '@adonisjs/core/http'

export default class CommentsController {
  async store({request, response, auth}: HttpContext) {
    console.log("meow");
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to upload post", error : true});
    }
    // console.log(request);
    try {
      const data = await request.validateUsing(commentStoreValidator);
      await Comment.create({
        userId : user.id,
        postId : data.postId,
        parentCommentId : data.commentId,
        content : data.content,
      });

      return response.ok({error : false, message : "post successfully posted"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError(
          {message : "Failed to load groups", error : true});
    }
  }
  async getPage({request, response}: HttpContext) {
    const data = await request.validateUsing(commentPageValidator)
    try {
      var query = Comment.query()
      if (data.commentId != null && data.commentId > 0) {
        query.where("parentCommentId", data.commentId);
      }
      else {
        query.where("postId", data.postId);
      };
      var comments =
          await query.orderBy('updated_at', 'desc').paginate(data.page, 10)

      return response.ok(comments);
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError({message : "Failed to load posts"});
    }
  }
}
