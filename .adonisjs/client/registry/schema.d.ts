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
  'posts.posts.get_posts_fyp': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPageFyp'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetUserValidator)>>
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
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPosts']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/posts_controller').default['getPosts']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'posts.posts.get_user_posts': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/posts/getPageUser'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/post').postGetUserValidator)>>
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
}
