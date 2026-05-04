// import Place from '#models/place'
import Post from '#models/post'
import PostImage from '#models/post_image'
import User from '#models/user'
import PostService from '#services/post_service'
import testUtils from '@adonisjs/core/services/test_utils'
import {test} from '@japa/runner'

test.group('PostService', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

// ── helpers ──────────────────────────────────────────────────────────
  async function makeUser(email = 'user@test.com') {
  return User.create({email, password : 'password123'})
  }

  /*async function makePlace() {
  return Place.create(
      {latitude : 48.0, longitude : 17.0, aiDescription : 'A nice spot'})
  }

  async function makePost(userId: number, placeId: number) {
  return Post.create({description : 'Test post', stars : 3, userId, placeId})
  }*/

  // ── createPost ────────────────────────────────────────────────────────

  test('createPost returns a post with correct description and rating', async ({ assert }) => {
    const user = await makeUser()

  // stub out getAiDescription so no real AI call is made
  PostService['getAiDescription'] = async () => 'Mocked AI description'

  const post = await PostService.createPost(user.id, {
    postText : 'Beautiful lake view',
    rating : 5,
    longitude : 17.1,
    latitude : 48.1,
  })

  assert.equal(post.description, 'Beautiful lake view')
  assert.equal(post.stars, 5)
  assert.exists(post.id)
    assert.exists(post.placeId)
  })

  test('createPost persists the post to the database', async ({ assert }) => {
    const user = await makeUser('persist@test.com')
  PostService['getAiDescription'] = async () => 'Mocked AI description'

  const post = await PostService.createPost(user.id, {
    postText : 'Saved to DB',
    rating : 3,
    longitude : 17.2,
    latitude : 48.2,
  })

  const found = await Post.find(post.id)
  // was able to create post
  assert.isNotNull(found)
    assert.equal(found!.description, 'Saved to DB')
  })

  test('createPost without image does not create a PostImage record', async ({ assert }) => {
    const user = await makeUser('noimage@test.com')
  PostService['getAiDescription'] = async () => 'Mocked AI description'

  const post = await PostService.createPost(user.id, {
    postText : 'No image post',
    rating : 2,
    longitude : 17.3,
    latitude : 48.3,
  })

  const image = await PostImage.query().where('postId', post.id).first()
    assert.isNull(image)
  })

  test('createPost stores userId on the created post', async ({ assert }) => {
    const user = await makeUser('owner@test.com')
  PostService['getAiDescription'] = async () => 'Mocked AI description'

  const post = await PostService.createPost(user.id, {
    postText : 'Owner check',
    rating : 4,
    longitude : 17.4,
    latitude : 48.4,
  })

    assert.equal(post.userId, user.id)
  })
})
