import Comment from '#models/comment'

export default class CommentService {

  static async createComment(userId: number, data: any) {
    const comment = await Comment.create({
      userId : userId,
      postId : data.postId,
      parentCommentId : data.commentId ?? null,
      content : data.content,
    })

    return comment
  }
}
