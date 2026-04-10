import Comment from "#models/comment";
import Like from "#models/like";
import {
  commentLikeValidator,
  commentPageValidator,
  commentStoreValidator,
  commentUpdateValidator
} from "#validators/comment";
import type {HttpContext} from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CommentsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
        error: true,
      })
    }

    try {
      const data = await request.validateUsing(commentStoreValidator)

      if (data.commentId) {
        const parentComment = await Comment.find(data.commentId)

        if (!parentComment) {
          return response.notFound({
            message: 'Parent comment not found',
            error: true,
          })
        }

        if (parentComment.postId !== data.postId) {
          return response.unprocessableEntity({
            message: 'Parent comment does not belong to the specified post',
            error: true,
          })
        }
      }

      const comment = await Comment.create({
        userId: user.id,
        postId: data.postId,
        parentCommentId: data.commentId,
        content: data.content,
      })

      return response.ok({
        error: false,
        message: 'Comment successfully posted',
        data: comment,
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to create comment',
        error: true,
      })
    }
  }

  async update({request, response, auth}: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message : 'User not authenticated',
        error : true,
      })
    }

    try {
      const data = await request.validateUsing(commentUpdateValidator)

      const comment = await Comment.find(data.commentId)

      if (!comment) {
        return response.notFound({
          message : 'Comment not found',
          error : true,
        })
      }

      if (comment.userId !== user.id) {
        return response.forbidden({
          message : 'You can only edit your own comments',
          error : true,
        })
      }

      comment.content = data.content;
      await comment.save()

      return response.ok({
        error : false,
        message : 'Comment updated successfully',
        data : comment,
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message : 'Failed to update comment',
        error : true,
      })
    }
  }

  async getPage({auth, request, response}: HttpContext) {
    const data = await request.validateUsing(commentPageValidator)
    const user = auth.user
    try {
      const query = Comment.query()

      if (data.commentId != null && data.commentId > 0) {
        query.where('parentCommentId', data.commentId)
      }
      else {
        query.where('postId', data.postId).whereNull('parentCommentId')
      }
      // vibecoded
      if (user) {
        query.select('*').select(db.raw(`EXISTS (
            SELECT 1 FROM likes
            WHERE likes.comment_id = comments.id
            AND likes.user_id = ?
          ) as "isLiked"`,
                                        [ user.id ]))
      } // till ere

      const comments =
          await query.withCount('likes', (q) => {q.as('likeCount')})
              .orderBy('updated_at', 'desc')
              .paginate(data.page, 10)
      const serialized = comments.serialize({
        fields : {
          pick : [
            'id', 'userId', 'postId', 'parentCommentId', 'content', 'createdAt',
            'updatedAt'
          ]
        },
        relations : {},
      })

      serialized.data = serialized.data.map((comment, index) => {
        const extras = comments.all()[index].$extras

        return {
        ...comment, likeCount: Number(extras.likeCount),
            isLiked: extras.isLiked,
        }
      })

        return response.ok(serialized)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message : 'Failed to load comments',
      })
    }
  }
  async like({request, response, auth}: HttpContext) {
    const user = auth.use("api").user;
    if (user == undefined) {
      return ({message : "Failed to like comment", error : true});
    }
    try {
      const data = await request.validateUsing(commentLikeValidator);
      const like = await Like.query()
                       .where("userId", user.id)
                       .where("commentId", data.commentId);

      if (like.length == 0) {
        await Like.create({
          userId : user.id,
          commentId : data.commentId,
        });
      }

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
