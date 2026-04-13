/*
      // sockety cez swagger
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import {controllers} from '#generated/controllers'
import {middleware} from '#start/kernel'
import type {HttpContext} from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import fs from 'node:fs'
import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import path from 'node:path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

router.get('/', () => {
  return { message: 'PONG', error: 'none' }
})
router.post('/', () => {
  return { test: 'successful' }
})

router.get('/uploads/:filename', async ({params, response}: HttpContext) => {
  try {
    // Construct the file path
    const filePath = app.makePath('public/uploads', params.filename)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return response.status(404).send('File not found')
    }

    // Get file extension for MIME type
    const ext = path.extname(params.filename).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.jpg' : 'image/jpeg',
      '.jpeg' : 'image/jpeg',
      '.png' : 'image/png',
      '.gif' : 'image/gif',
      '.webp' : 'image/webp',
      '.svg' : 'image/svg+xml',
    }

    const mimeType = mimeTypes[ext] || 'image/jpeg'

    // Set headers
    response.header('Content-Type', mimeType)
    response.header('Cache-Control', 'public, max-age=31536000')

    // Use download() instead of stream() to avoid TypeScript errors
    return response.download(filePath)
  } catch (error) {
    console.error('Error serving image:', error)
    return response.status(500).send('Error serving image')
  }
})

router.get('/docs', async ({response}) => {
  const filePath = resolve('./node_modules/swagger-ui-dist/index.html')

  const html = await readFile(filePath, 'utf-8');

  return response.type('html').send(html.replace(
      'https://petstore.swagger.io/v2/swagger.json', '/swagger.json'))
});

router.get('/swagger.json', async ({response}) => {
  try {
    const filePath = join(__dirname, '../swagger.json') // adjust as needed
    const jsonString = await readFile(filePath, 'utf-8')
    const swaggerSpec = JSON.parse(jsonString)

    return response.json(swaggerSpec)
  } catch (error) {
    console.error('Failed to read swagger.json', error)
    return response.status(500).json({error : 'Failed to load swagger.json'})
  }
})

router.get('/docs/*', async ({ params, response }) => {
  const filePath = resolve(
    './node_modules/swagger-ui-dist',
    params['*'].join('/')
  )
  return response.download(filePath)
})
  router
      .group(() => {
        // get place info (malo by vratit place)
        // get place posts(paginated)
        // edit post
        router.group(() => {
                router.post('signup', [ controllers.NewAccount, 'store' ]);
                router.post('login', [ controllers.AccessToken, 'store' ])
                router.post('google', [ controllers.NewAccount, 'google' ])
                router.post('logout', [ controllers.AccessToken, 'destroy' ])
                    .use(middleware.auth())
              })
                .prefix('auth')
                .as('auth')

        router
            .group(() => {
              router.get('/profile', [ controllers.Profile, 'show' ])
                  .use(middleware.auth());
              router.get('/get', [ controllers.Profile, 'get' ])
                  .use(middleware.auth());
              router.post('/follow', [ controllers.Profile, 'follow' ])
                  .use(middleware.auth());
              router.post('/unfollow', [ controllers.Profile, 'unfollow' ])
                  .use(middleware.auth());
            })
            .prefix('account')
        router.group(() => {
                router.get('/get', [ controllers.Places, 'getInfo' ]);
              })
                .prefix('place')
                .as('place');
        router.group(() => {
                router.post('/create', [ controllers.Posts, 'store' ])
                    .use(middleware.auth());
                router.delete('/delete', [ controllers.Posts, 'delete' ])
                    .use(middleware.auth());
                router.patch('/update', [ controllers.Posts, 'update' ])
                    .use(middleware.auth())
                router.get('/getPageFyp', [ controllers.Posts, 'getPostsFyp' ]);
                router.get('/getPage', [ controllers.Posts, 'getPosts' ]);
                router.get('/getPagePlace',
                           [ controllers.Posts, 'getPostsPlace' ]);
                router.get('/getPageUser',
                           [ controllers.Posts, 'getUserPosts' ]);
                router.get('/get', [ controllers.Posts, 'getPost' ]);
                router.put('/rate', [ controllers.Posts, 'rate' ]);
              })

                .prefix('posts')
                .as('posts'); //.use(middleware.auth())
        router.group(() => {
                router.post('/create', [ controllers.Comments, 'store' ])
                    .use(middleware.auth());
                router.patch('/update', [ controllers.Comments, 'update' ])
                    .use(middleware.auth())
                router.get('/getPage', [ controllers.Comments, 'getPage' ]);
                router.put('/like', [ controllers.Comments, 'like' ])
                    .use(middleware.auth());
                router
                    .delete('/removeLike',
                            [ controllers.Comments, 'removeLike' ])
                    .use(middleware.auth());
              })
                .prefix('comments')
                .as('comments')
        /*router.group(() => {router.post('/set', [ controllers.Ratings, 'set'
           ]) .use(middleware.auth())}) .prefix('ratings') .as('ratings')*/

        // router.get('/uploads/*', async ({params, response}) => {return
        // "todo"})
      })
      .prefix('/api/v1')
