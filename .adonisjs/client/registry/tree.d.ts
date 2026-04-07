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
  }
  posts: {
    posts: {
      store: typeof routes['posts.posts.store']
      update: typeof routes['posts.posts.update']
      getPostsFyp: typeof routes['posts.posts.get_posts_fyp']
      getPosts: typeof routes['posts.posts.get_posts']
      getUserPosts: typeof routes['posts.posts.get_user_posts']
      getPost: typeof routes['posts.posts.get_post']
    }
  }
  comments: {
    comments: {
      store: typeof routes['comments.comments.store']
      update: typeof routes['comments.comments.update']
      getPage: typeof routes['comments.comments.get_page']
    }
  }
  ratings: {
    ratings: {
      set: typeof routes['ratings.ratings.set']
    }
  }
}
