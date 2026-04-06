import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.profile.follow': { paramsTuple?: []; params?: {} }
    'profile.profile.unfollow': { paramsTuple?: []; params?: {} }
    'posts.posts.store': { paramsTuple?: []; params?: {} }
    'posts.posts.delete': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_place': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
    'comments.comments.store': { paramsTuple?: []; params?: {} }
    'comments.comments.get_page': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_place': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
    'comments.comments.get_page': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_place': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
    'comments.comments.get_page': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.follow': { paramsTuple?: []; params?: {} }
    'profile.profile.unfollow': { paramsTuple?: []; params?: {} }
    'comments.comments.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'posts.posts.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'posts.posts.delete': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}