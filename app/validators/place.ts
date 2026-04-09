import vine from '@vinejs/vine'
const longitude = () => vine.number()
const latitude = () => vine.number()
const placeId = () => vine.number()
export const placeGetValidator = vine.create({
  longitude :
      longitude().optional(), // either specify longitude and latitude or postId
  latitude : latitude().optional(),
  placeId : placeId().exists({table : 'places', column : 'id'}).optional(),
})
