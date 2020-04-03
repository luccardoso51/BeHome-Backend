const express           = require('express'),
      connection        = require('./database/connection'),
      UserController    = require('./controllers/UserController'),
      PostController    = require('./controllers/PostController'),
      ProfileController = require('./controllers/ProfileController'),
      SessionController = require('./controllers/SessionController'),
      routes            = express.Router();

routes.get('/', (req, res) => {
  return res.send('Home page');
})

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.delete('/users', UserController.delete);

routes.get('/profile', ProfileController.index);

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.create);
routes.delete('/posts/:id', PostController.delete);

routes.get('/categories', async (req, res) => {
  const categories = await connection('categories').select('*');
  
  return res.json(categories);
});

routes.get('/categories_posts', async (req, res) => {
  const categories_posts = await connection('categories_posts').select('*');
  
  return res.json(categories_posts);
});

module.exports = routes;