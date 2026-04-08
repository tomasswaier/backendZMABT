import vine from '@vinejs/vine'
const content = () => vine.string().maxLength(5000)
const postId = () => vine.number()
const commentId = () => vine.number()
export const commentStoreValidator = vine.create({
  content : content(),
  postId : postId().exists({table : 'posts', column : 'id'}),
  commentId :
      commentId()
          .exists({table : 'comments', column : 'id'})
          .optional(), // should exist in posts as well but I don't have time
})
export const commentPageValidator = vine.create({
  postId : postId().exists({table : 'posts', column : 'id'}),
  commentId :
      commentId()
          .exists({table : 'comments', column : 'id'})
          .optional(), // should exist in posts as well but I don't have time
  page : vine.number()

})
export const commentUpdateValidator = vine.create({
  commentId: commentId().exists({ table: 'comments', column: 'id' }),
  content: content(),
})

export const commentLikeValidator = vine.create(
    {commentId : commentId().exists({table : 'comments', column : 'id'})})
