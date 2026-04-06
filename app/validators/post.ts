import vine from '@vinejs/vine'

const postText = () => vine.string().maxLength(5000)
const rating = () => vine.number().min(1).max(5)
const longitude = () => vine.number()
const latitude = () => vine.number()
const userId = () => vine.number()
const postId = () => vine.number()
const placeId = () => vine.number()

export const postStoreValidator = vine.create({
  postText : postText(),
  rating : rating(),
  longitude : longitude(),
  latitude : latitude(),
  image : vine.file({
                size : '5mb',
                extnames : [ 'jpg', 'png', 'jpeg' ],
              })
              .optional(),
})

export const postGetProfilePageValidator = vine.create({

  userId : userId().exists({table : 'users', column : 'id'}),
  page : vine.number()

})
export const postGetPagePlacesValidator = vine.create({

  userId : userId().exists({table : 'users', column : 'id'}),
  placeId : placeId().exists({table : 'places', column : 'id'}),
  page : vine.number()

})
export const postGetValidator = vine.create({

  postId : postId().exists({table : 'posts', column : 'id'}),

})
export const postGetPageValidator = vine.create({
  page : vine.number()

})
