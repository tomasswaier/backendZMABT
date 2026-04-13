#set page(paper: "a4")
#set heading(numbering: "1.")

#show link: set text(fill: blue, weight: 700)
#show link: underline

#set align(center)
#set text(size: 17pt, weight: "bold")

Evaluating Claims About Artificial General Intelligence

#set align(left)
#set text(size: 12pt, weight: "regular")
#align(center)[
Tomáš meravý Murárik, Alex DuchoN
]

= Introduction
Share & Trail is a social media application designed to connect people through places, experiences, and journeys. Inspired by familiar platforms like Instagram, it provides a simple and engaging way for users to discover and share moments tied to real-world locations.

The application supports both guest and registered user experiences. Visitors can freely browse posts and explore places without needing to create an account, making content easily accessible to anyone. Registered users, however, unlock the full functionality of the platform, including the ability to create and share their own posts.

A core feature of Share & Trail is its emphasis on location-based posts. Every post created by a user is linked to a specific place, encouraging meaningful context behind each shared experience. Users can enhance their posts with photos and short descriptions, capturing the essence of their journeys and allowing others to explore and be inspired.


= Archtecture and structure
Backend of our project follows basic adonisjs(/laravel) structure.
To run the project simply install packages using "npm install", run migrations using "node ace migration:run" and start the server by running node ace serve

= Db model
#figure(
  image("database/diagramSchema.svg", width: 80%),
  caption: [
    Database model schema
  ],
)




= Authentication
For authentication this project uses Adonisjs Auth standard. SSO authentication is not yet implemented however the database already supports it with the auth_provider column in the User table.


= Endpoints
Base URL: /api/v1
Swagger: /swagger.json
API Docs UI: /docs

This document provides an overview of the ZMABT backend API, which powers the Share & Trail application. The API enables authentication, post creation, place-based content exploration, and social interactions such as comments, likes, and follows.
#table(
  columns: (1fr, auto, auto, auto, 2fr),
  inset: 10pt,
  align: horizon,
  table.header(
    [*Category*], [*Method*], [*Route*], [*Parameters*], [*Description*],
  ),

  // Auth
  [Auth], [POST], [/auth/signup], [-], [Create a new user account],
  [Auth], [POST], [/auth/login], [-], [Authenticate user and return token],
  [Auth], [POST], [/auth/logout], [Auth], [Logout authenticated user],
  [Auth], [POST], [/auth/google], [-], [Authenticate using Google],
  [Auth], [POST], [/auth/apple], [-], [Authenticate using Apple],

  // Account
  [Account], [GET], [/account/profile], [Auth], [Get current user profile],
  [Account], [GET], [/account/get], [Auth], [Get another user profile],
  [Account], [POST], [/account/follow], [Auth], [Follow a user],
  [Account], [POST], [/account/unfollow], [Auth], [Unfollow a user],

  // Places
  [Places], [GET], [/place/get], [-], [Get place information],

  // Posts
  [Posts], [POST], [/posts/create], [Auth], [Create a new post],
  [Posts], [DELETE], [/posts/delete], [Auth], [Delete a post],
  [Posts], [PATCH], [/posts/update], [Auth], [Update a post],
  [Posts], [GET], [/posts/getPageFyp], [-], [Get FYP posts],
  [Posts], [GET], [/posts/getPage], [-], [Get paginated posts],
  [Posts], [GET], [/posts/getPagePlace], [-], [Get posts by place],
  [Posts], [GET], [/posts/getPageUser], [-], [Get user posts],
  [Posts], [GET], [/posts/get], [-], [Get post by ID],
  [Posts], [PUT], [/posts/rate], [Auth], [Rate a post],

  // Comments
  [Comments], [POST], [/comments/create], [Auth], [Create a comment],
  [Comments], [PATCH], [/comments/update], [Auth], [Update a comment],
  [Comments], [GET], [/comments/getPage], [-], [Get paginated comments],
  [Comments], [PUT], [/comments/like], [Auth], [Like a comment],
  [Comments], [DELETE], [/comments/removeLike], [Auth], [Remove comment like],

  // Files
  [Files], [GET], [/uploads/:filename], [-], [Get uploaded file],

  // Utility
  [Utility], [GET], [/], [-], [Health check],
  [Utility], [POST], [/], [-], [Test endpoint],
  [Utility], [GET], [/docs], [-], [Swagger UI],
  [Utility], [GET], [/swagger.json], [-], [OpenAPI specification],
)

