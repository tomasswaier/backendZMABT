/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'posts.posts.store': {
    methods: ["PUT"],
    pattern: '/api/v1/posts/create',
    tokens: [{"old":"/api/v1/posts/create","type":0,"val":"api","end":""},{"old":"/api/v1/posts/create","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/create","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['posts.posts.store']['types'],
  },
  'posts.posts.delete': {
    methods: ["DELETE"],
    pattern: '/api/v1/posts/delete',
    tokens: [{"old":"/api/v1/posts/delete","type":0,"val":"api","end":""},{"old":"/api/v1/posts/delete","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/delete","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/delete","type":0,"val":"delete","end":""}],
    types: placeholder as Registry['posts.posts.delete']['types'],
  },
  'posts.posts.get_posts_fyp': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/posts/getPageFyp',
    tokens: [{"old":"/api/v1/posts/getPageFyp","type":0,"val":"api","end":""},{"old":"/api/v1/posts/getPageFyp","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/getPageFyp","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/getPageFyp","type":0,"val":"getPageFyp","end":""}],
    types: placeholder as Registry['posts.posts.get_posts_fyp']['types'],
  },
  'posts.posts.get_posts': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/posts/getPage',
    tokens: [{"old":"/api/v1/posts/getPage","type":0,"val":"api","end":""},{"old":"/api/v1/posts/getPage","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/getPage","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/getPage","type":0,"val":"getPage","end":""}],
    types: placeholder as Registry['posts.posts.get_posts']['types'],
  },
  'posts.posts.get_posts_place': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/posts/getPagePlace',
    tokens: [{"old":"/api/v1/posts/getPagePlace","type":0,"val":"api","end":""},{"old":"/api/v1/posts/getPagePlace","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/getPagePlace","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/getPagePlace","type":0,"val":"getPagePlace","end":""}],
    types: placeholder as Registry['posts.posts.get_posts_place']['types'],
  },
  'posts.posts.get_user_posts': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/posts/getPageUser',
    tokens: [{"old":"/api/v1/posts/getPageUser","type":0,"val":"api","end":""},{"old":"/api/v1/posts/getPageUser","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/getPageUser","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/getPageUser","type":0,"val":"getPageUser","end":""}],
    types: placeholder as Registry['posts.posts.get_user_posts']['types'],
  },
  'posts.posts.get_post': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/posts/get',
    tokens: [{"old":"/api/v1/posts/get","type":0,"val":"api","end":""},{"old":"/api/v1/posts/get","type":0,"val":"v1","end":""},{"old":"/api/v1/posts/get","type":0,"val":"posts","end":""},{"old":"/api/v1/posts/get","type":0,"val":"get","end":""}],
    types: placeholder as Registry['posts.posts.get_post']['types'],
  },
  'comments.comments.store': {
    methods: ["POST"],
    pattern: '/api/v1/comments/create',
    tokens: [{"old":"/api/v1/comments/create","type":0,"val":"api","end":""},{"old":"/api/v1/comments/create","type":0,"val":"v1","end":""},{"old":"/api/v1/comments/create","type":0,"val":"comments","end":""},{"old":"/api/v1/comments/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['comments.comments.store']['types'],
  },
  'comments.comments.get_page': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/comments/getPage',
    tokens: [{"old":"/api/v1/comments/getPage","type":0,"val":"api","end":""},{"old":"/api/v1/comments/getPage","type":0,"val":"v1","end":""},{"old":"/api/v1/comments/getPage","type":0,"val":"comments","end":""},{"old":"/api/v1/comments/getPage","type":0,"val":"getPage","end":""}],
    types: placeholder as Registry['comments.comments.get_page']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
