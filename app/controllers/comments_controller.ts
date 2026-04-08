import Comment from "#models/comment";
import Like from "#models/like";
import {
  commentLikeValidator,
  commentPageValidator,
  commentStoreValidator
} from "#validators/comment";
import type {HttpContext} from '@adonisjs/core/http'

export default class CommentsController {
  async store({request, response, auth}: HttpContext) {
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to upload post", error : true});
    }

    try {
      const data = await request.validateUsing(commentStoreValidator)

      await Comment.create({
        userId: user.id,
        postId: data.postId,
        parentCommentId: data.commentId,
        content: data.content,
      })

      return response.ok({
        error: false,
        message: 'Comment successfully posted',
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to create comment',
        error: true,
      })
    }
  }

  async update({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
        error: true,
      })
    }

    try {
      const data = await request.validateUsing(commentUpdateValidator)

      const comment = await Comment.find(data.commentId)

      if (!comment) {
        return response.notFound({
          message: 'Comment not found',
          error: true,
        })
      }

      if (comment.userId !== user.id) {
        return response.forbidden({
          message: 'You can only edit your own comments',
          error: true,
        })
      }

      comment.content = data.content
      await comment.save()

      return response.ok({
        error: false,
        message: 'Comment updated successfully',
        data: comment,
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to update comment',
        error: true,
      })
    }
  }

  async getPage({ request, response }: HttpContext) {
    const data = await request.validateUsing(commentPageValidator)

    try {
      const query = Comment.query()

      if (data.commentId != null && data.commentId > 0) {
        query.where('parentCommentId', data.commentId)
      } else {
        query.where('postId', data.postId).whereNull('parentCommentId')
      }

      const comments = await query
        .orderBy('updated_at', 'desc')
        .paginate(data.page, 10)

      return response.ok(comments)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to load comments',
      })
    }
  }
  async like({request, response, auth}: HttpContext) {
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to like post", error : true});
    }
    // console.log(request);
    try {
      const data = await request.validateUsing(commentLikeValidator);
      await Like.create({
        userId : user.id,
        commentId : data.commentId,
      });

      return response.ok(
          {error : false, message : "comment successfully liked"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError(
          {message : "Failed to like", error : true});
    }
  }
  async removeLike({request, response, auth}: HttpContext) {
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to remove like from post", error : true});
    }
    // console.log(request);
    try {
      const data = await request.validateUsing(commentLikeValidator);
      const like = await Like.query()
                       .where("userId", user.id)
                       .where("commentId", data.commentId)
                       .limit(1)
      if (like[0]) {
        like[0].delete()
      }
      return response.ok(
          {error : false, message : "comment like successfully deleted"});
    } catch (error) {
      console.error("Error:", error);
      return response.internalServerError(
          {message : "Failed to remove like", error : true});
    }
  }
}
