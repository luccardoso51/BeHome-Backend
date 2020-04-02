const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const posts = await connection('posts').select("*");

    return res.json(posts);
  },
  async create(req, res) {
    const { title, description, img_url, categories } = req.body;
    const user_id = req.headers.authorization;

    const [post_id] = await connection('posts').insert({
      title,
      description,
      img_url,
      user_id
    });

    const categoriesToInsert = categories.map(categorie => (
      {post_id: post_id, categorie_id: categorie.id}
    ));

    const [id] = await connection('categories_posts').insert(categoriesToInsert);

    return res.json(id);
  }
};