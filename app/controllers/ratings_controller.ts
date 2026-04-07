import Post from '#models/post'
import Rating from '#models/rating'
import type { HttpContext } from '@adonisjs/core/http'

export default class RatingsController {
  async set({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
        error: true,
      })
    }

    const postId = request.input('postId')
    const stars = request.input('stars')

    if (
      typeof postId !== 'number' ||
      typeof stars !== 'number' ||
      stars < 1 ||
      stars > 5
    ) {
      return response.badRequest({
        message: 'Invalid rating data',
        error: true,
      })
    }

    const post = await Post.find(postId)

    if (!post) {
      return response.notFound({
        message: 'Post not found',
        error: true,
      })
    }

    if (post.userId === user.id) {
      return response.forbidden({
        message: 'You cannot rate your own post',
        error: true,
      })
    }

    const existingRating = await Rating.query()
      .where('userId', user.id)
      .where('postId', postId)
      .first()

    if (existingRating) {
      existingRating.stars = stars
      await existingRating.save()

      return response.ok({
        error: false,
        message: 'Rating updated successfully',
        data: existingRating,
      })
    }

    const rating = await Rating.create({
      userId: user.id,
      postId,
      stars,
    })

    return response.ok({
      error: false,
      message: 'Rating created successfully',
      data: rating,
    })
  }
}