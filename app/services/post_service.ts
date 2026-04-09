import PlacesController from '#controllers/places_controller'
// import Place from '#models/place'
import Post from '#models/post'
import PostImage from '#models/post_image'
import type {MultipartFile} from '@adonisjs/core/types/bodyparser'

export default class PostService {
  static async createPost(userId: number, data: any, image?: MultipartFile) {

    /*const place = await Place.create({
      aiDescription,
      latitude : data.latitude,
      longitude : data.longitude,
    })*/
    const aiDescription = await this.getAiDescription()

    const place = await PlacesController.store(aiDescription, data.longitude,
                                               data.latitude)
    console.log(place)

    const post = await Post.create({
      description : data.postText,
      stars : data.rating,
      placeId : place.id,
      userId : userId,
    })

    if (image) {
      const fileName = `${Date.now()}.${image.extname}`

                       await image.moveToDisk(`uploads/${fileName}`, 'fs')

      if (!image.isValid) {
        throw new Error('Image upload failed')
      }

      await PostImage.create({
        postId : post.id,
        imagePath : `uploads/${fileName}`,
      })
    }

    return post
  }
  static async getAiDescription() { return 'placeholder description' }
}
