import vine from '@vinejs/vine'
const content = () => vine.string().maxLength(5000)
const postId = () => vine.number()
export const commentStoreValidator = vine.create({
  content : content(),
  postId : postId().exists({table : 'posts', column : 'id'})
})
export const commentPageValidator = vine.create({

  postId : postId().exists({table : 'posts', column : 'id'}),
  page : vine.number()

})
