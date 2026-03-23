import vine from '@vinejs/vine'

const postText = () => vine.string().maxLength(5000)
const rating = () => vine.number().min(1).max(5)
const longitude = () => vine.number()
const latitude = () => vine.number()
const userId = () => vine.number()

export const postStoreValidator = vine.create({
  postText : postText(),
  rating : rating(),
  longitude : longitude(),
  latitude : latitude()
})

export const postGetValidator = vine.create({

  userId : userId().exists({table : 'users', column : 'id'}),
  page : vine.number()

})
export const postGetUserValidator = vine.create({
  page : vine.number()

})
