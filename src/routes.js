const express         = require('express'),
      connection = require('./database/connection'),
      UserController  = require('./controllers/UserController'),
      PostController  = require('./controllers/PostController'),
      routes          = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.create);

routes.get('/categories', async (req, res) => {
  const categories = await connection('categories').select('*');
  
  return res.json(categories);
});

routes.get('/categories_posts', async (req, res) => {
  const categories_posts = await connection('categories_posts').select('*');
  
  return res.json(categories_posts);
});

module.exports = routes;