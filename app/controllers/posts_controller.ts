import Place from '#models/place'
import Post from '#models/post'
import PostImage from '#models/post_image'
import User from '#models/user'
import {
  postGetPageValidator,
  postGetUserValidator,
  postGetValidator,
  postStoreValidator,
  postUpdateValidator,
} from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async getPost({ request, response }: HttpContext) {
    const data = await request.validateUsing(postGetValidator)

    try {
      const post = await Post.find(data.postId)

      if (!post) {
        return response.notFound({ message: 'Post not found' })
      }

      const postImages = await post.related('images').query()
      return response.ok({ post, postImages })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({ message: 'Failed to load post' })
    }
  }

  async getPosts({ request, response }: HttpContext) {
    const data = await request.validateUsing(postGetPageValidator)

    try {
      const user = await User.find(data.userId)

      if (!user) {
        return response.notFound({ message: 'User not found' })
      }

      const posts = await this.getPostData(user, data.page)
      return response.ok(posts)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({ message: 'Failed to load posts' })
    }
  }

  async getPostsFyp({ request, response }: HttpContext) {
    const data = await request.validateUsing(postGetUserValidator)

    try {
      const posts = await Post.query()
        .orderBy('updated_at', 'desc')
        .paginate(data.page, 10)

      return response.ok(posts)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({ message: 'Failed to load posts' })
    }
  }

  async getUserPosts({ auth, request, response }: HttpContext) {
    const data = await request.validateUsing(postGetUserValidator)

    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized({ message: 'User not authenticated' })
      }

      const posts = await this.getPostData(user, data.page)
      return response.ok(posts)
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({ message: 'Failed to load posts' })
    }
  }

  getPostData(user: User, page: number) {
    return user.related('posts')
      .query()
      .orderBy('created_at', 'desc')
      .paginate(page, 10)
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message: 'Not authenticated',
        error: true,
      })
    }

    try {
      const data = await request.validateUsing(postStoreValidator)

      const aiDescription = 'placeholder description'

      const place = await Place.create({
        aiDescription,
        latitude: data.latitude,
        longitude: data.longitude,
      })

      const post = await Post.create({
        description: data.postText,
        stars: data.rating,
        placeId: place.id,
        userId: user.id,
      })

      const image = request.file('image')

      if (image) {
        const fileName = `${Date.now()}.${image.extname}`

        await image.moveToDisk(`uploads/${fileName}`, 'fs')

        if (!image.isValid) {
          console.log(image.errors)
          return response.badRequest({
            message: 'Image upload failed',
            error: true,
          })
        }

        await PostImage.create({
          postId: post.id,
          imagePath: `uploads/${fileName}`,
        })
      }

      return response.ok({
        error: false,
        message: 'Post successfully created',
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to create post',
        error: true,
      })
    }
  }

  async update({ request, response, auth }: HttpContext) {
    const user = auth.use('api').user

    if (!user) {
      return response.unauthorized({
        message: 'User not authenticated',
        error: true,
      })
    }

    try {
      const data = await request.validateUsing(postUpdateValidator)

      const post = await Post.find(data.postId)

      if (!post) {
        return response.notFound({
          message: 'Post not found',
          error: true,
        })
      }

      if (post.userId !== user.id) {
        return response.forbidden({
          message: 'You can only edit your own posts',
          error: true,
        })
      }

      post.description = data.postText
      post.stars = data.rating
      await post.save()

      return response.ok({
        error: false,
        message: 'Post updated successfully',
        data: post,
      })
    } catch (error) {
      console.error('Error:', error)
      return response.internalServerError({
        message: 'Failed to update post',
        error: true,
      })
    }
  }
}