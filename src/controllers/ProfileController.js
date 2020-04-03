const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const user_id = req.headers.authorization;
  
    const posts = await connection('posts')
      .where('user_id', user_id)
      .select('*') ;

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
  }
}