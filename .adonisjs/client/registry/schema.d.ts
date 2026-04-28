/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.profile.follow': {
    methods: ["POST"]
    pattern: '/api/v1/account/follow'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').followValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').followValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['follow']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['follow']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.unfollow': {
    methods: ["POST"]
    pattern: '/api/v1/account/unfollow'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').followValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').followValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['unfollow']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['unfollow']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.update_bio': {
    methods: ["PATCH"]
    pattern: '/api/v1/account/updateBio'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').updateBioValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').updateBioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateBio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['updateBio']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.store': {
    methods: ["POST"]
    pattern: '/api/v1/posts/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').postStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/post').postStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.delete': {
    methods: ["DELETE"]
    pattern: '/api/v1/posts/delete'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').postGetValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/post').postGetValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['delete']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/posts/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').postUpdateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/post').postUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_posts_fyp': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPageFyp'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPostsFyp']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPostsFyp']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_posts': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPage'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetProfilePageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPosts']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPosts']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_posts_place': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPagePlace'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetPagePlacesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPostsPlace']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPostsPlace']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_user_posts': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPageUser'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getUserPosts']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getUserPosts']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_post': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/get'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPost']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPost']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.rate': {
    methods: ["PUT"]
    pattern: '/api/v1/posts/rate'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/post').postRateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/post').postRateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['rate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['rate']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.store': {
    methods: ["POST"]
    pattern: '/api/v1/comments/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').commentStoreValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').commentStoreValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/comments/update'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').commentUpdateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').commentUpdateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.delete': {
    methods: ["DELETE"]
    pattern: '/api/v1/comments/delete'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').commentDeleteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').commentDeleteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['delete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['delete']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.get_page': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/comments/getPage'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/comment').commentPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['getPage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['getPage']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.like': {
    methods: ["PUT"]
    pattern: '/api/v1/comments/like'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').commentLikeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').commentLikeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['like']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['like']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'comments.comments.remove_like': {
    methods: ["DELETE"]
    pattern: '/api/v1/comments/removeLike'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/comment').commentLikeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/comment').commentLikeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['removeLike']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/comments_controller').default['removeLike']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ratings.ratings.set': {
    methods: ["POST"]
    pattern: '/api/v1/ratings/set'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['set']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ratings_controller').default['set']>>>
    }
  }
}
