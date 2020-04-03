const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const posts = await connection('posts').select("*");
    
    const postIds = posts.map(post => post["id"]);
    
    const categories = await connection('categories')
      .join('categories_posts', "categories.id", "categories_posts.categorie_id")
      .whereIn("categories_posts.post_id", postIds)
      .select('categories.*', "categories_posts.post_id as post_id");
    
    const posts_list = posts.map(post => {
      post.categories = categories.filter(categorie => categorie.post_id === post.id);
      return post;
    });  

    return res.json(posts_list);
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
  },
  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const post = await connection('posts')
      .where('id', id)
      .select('user_id')
      .first();
    
    if(post.user_id !== user_id) {
      return res.status(401).json({error: 'Operation not permitted'});
    }

    await connection('categories_posts').where('post_id', id).delete();
    await connection('posts').where('id', id).delete();

    return res.json(204).send();
  }
};