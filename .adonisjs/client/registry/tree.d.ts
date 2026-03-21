/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessToken: {
      store: typeof routes['auth.access_token.store']
      destroy: typeof routes['auth.access_token.destroy']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    posts: {
      store: typeof routes['profile.posts.store']
      getPosts: typeof routes['profile.posts.get_posts']
      getUserPosts: typeof routes['profile.posts.get_user_posts']
    }
  }
}
