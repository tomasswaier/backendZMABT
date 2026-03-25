import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.posts.store': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts_fyp': { paramsTuple?: []; params?: {} }
    'posts.posts.get_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_user_posts': { paramsTuple?: []; params?: {} }
    'posts.posts.get_post': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.store': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy': { paramsTuple?: []; params?: {} }
    'posts.posts.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}