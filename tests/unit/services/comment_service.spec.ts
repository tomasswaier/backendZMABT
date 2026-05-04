import Comment from '#models/comment'
import Place from '#models/place'
import Post from '#models/post'
import User from '#models/user'
import CommentService from '#services/comment_service'
import testUtils from '@adonisjs/core/services/test_utils'
import {test} from '@japa/runner'

test.group('CommentService', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

// ── helpers ───────────────────────────────────────────────────────────
  async function makeUser(email = 'user@test.com') {
  return User.create({email, password : 'password123'})
  }

  async function makePost(userId: number) {
  const place = await Place.create(
      {latitude : 48.0, longitude : 17.0, aiDescription : 'spot'})
  return Post.create(
      {description : 'Post', stars : 3, userId, placeId : place.id})
  }

  // ── createComment ─────────────────────────────────────────────────────

  test('createComment creates a top-level comment with correct fields', async ({ assert }) => {
    const user = await makeUser()
  const post = await makePost(user.id)

  const comment = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : null,
    content : 'Nice post!',
  })

  assert.equal(comment.userId, user.id)
  assert.equal(comment.postId, post.id)
  assert.equal(comment.content, 'Nice post!')
    assert.isNull(comment.parentCommentId)
  })

  test('createComment persists the comment to the database', async ({ assert }) => {
    const user = await makeUser('persist@test.com')
  const post = await makePost(user.id)

  const comment = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : null,
    content : 'Saved comment',
  })

  const found = await Comment.find(comment.id)
  assert.isNotNull(found)
    assert.equal(found!.content, 'Saved comment')
  })

  test('createComment with commentId creates a nested reply', async ({ assert }) => {
    const user = await makeUser('reply@test.com')
  const post = await makePost(user.id)

  const parent = await Comment.create({
    userId : user.id,
    postId : post.id,
    content : 'Parent comment',
  })

  const reply = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : parent.id,
    content : 'This is a reply',
  })

  assert.equal(reply.parentCommentId, parent.id)
    assert.equal(reply.content, 'This is a reply')
  })

  test('createComment with null commentId sets parentCommentId to null', async ({ assert }) => {
    const user = await makeUser('nullparent@test.com')
  const post = await makePost(user.id)

  const comment = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : null,
    content : 'Top level',
  })

    assert.isNull(comment.parentCommentId)
  })

  test('multiple comments on same post are independent', async ({ assert }) => {
    const user = await makeUser('multi@test.com')
  const post = await makePost(user.id)

  const first = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : null,
    content : 'First',
  })
  const second = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : null,
    content : 'Second',
  })

  assert.notEqual(first.id, second.id)
    assert.equal(first.postId, second.postId)
  })

  test('reply to a reply correctly sets parentCommentId', async ({ assert }) => {
    const user = await makeUser('deepreply@test.com')
  const post = await makePost(user.id)

  const root = await Comment.create(
      {userId : user.id, postId : post.id, content : 'Root'})
  const child = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : root.id,
    content : 'Child',
  })
  const grandchild = await CommentService.createComment(user.id, {
    postId : post.id,
    commentId : child.id,
    content : 'Grandchild',
  })

    assert.equal(grandchild.parentCommentId, child.id)
  })
})
