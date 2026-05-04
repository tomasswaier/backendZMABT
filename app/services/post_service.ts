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
    const aiDescription = await this.getAiDescription(data.postText)

    const place = await PlacesController.store(aiDescription, data.longitude,
                                               data.latitude, userId)

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
  static async getAiDescription(text: string): Promise<string> {
    try {
      const response =
          await fetch(`${process.env.LM_STUDIO_URL}/v1/chat/completions`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
              model : process.env.LM_STUDIO_MODEL ?? 'local-model',
              messages : [
                {
                  role : 'user',
                  content :
                      `Your task is to read the following text and make a general description(max 50 tokens) of a place it describes. Answer only text which describes the place here is the text:\n\n${
                          text}`,
                },
              ],
              temperature : 0.7,
              max_tokens : 500,
            }),
          })

      if (!response.ok) {
        console.error('LM Studio error:', response.status,
                      await response.text())
        return 'No description available'
      }

      const data = await response.json()
      console.log(data)
      console.log(data.choices[0].message.content)
      return data.choices[0].message.content.trim()

    } catch (error) {
      console.error('Failed to reach LM Studio:', error)
      return 'No description available'
    }
  }
}
