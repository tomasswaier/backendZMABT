/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import {controllers} from '#generated/controllers'
import {middleware} from '#start/kernel'
import router from '@adonisjs/core/services/router'
import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

router.get('/', () => {
  return { message: 'meowkity', error: 'none' }
})
router.post('/', () => {
  return { test: 'working' }
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
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
    router.post('login', [ controllers.AccessToken, 'store' ])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

        router.group(() => {router.get('/profile',
                                       [ controllers.Profile, 'show' ])})
                .prefix('account')
                .as('profile').use(middleware.auth());
        router.group(() => {
                router.post('/create', [ controllers.Posts, 'store' ]);
                router.get('/getPageFyp', [ controllers.Posts, 'getPostsFyp' ]);
                router.get('/getPage', [ controllers.Posts, 'getPosts' ]);
                router.get('/getPageUser',
                           [ controllers.Posts, 'getUserPosts' ]);
                router.get('/get', [ controllers.Posts, 'getPost' ]);
              })
                .prefix('posts')
                .as('posts').use(middleware.auth())
        router.group(() => {
                router.post('/create', [ controllers.Comments, 'store' ]);
                router.get('/getPage', [ controllers.Comments, 'getPage' ]);
                // ]); router.get('/getPage', [ controllers.Posts, 'getPosts'
                // ]); router.get('/getPageUser',
                //           [ controllers.Posts, 'getUserPosts' ])
                // router.get('/get', [ controllers.Posts, 'getPost' ]);
              })
                .prefix('comments')
                .as('comments').use(middleware.auth())
      })
      .prefix('/api/v1')
