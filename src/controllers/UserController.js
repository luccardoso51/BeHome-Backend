const crypto = require("crypto"),
  connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const users = await connection("users").select("*");

    return res.json(users);
  },
  async create(req, res) {
    const { name, email } = req.body;
    const id = crypto.randomBytes(2).toString("HEX");

    await connection("users").insert({
      id,
      name,
      email
    });

    return res.json({ id });
  },
  async delete(req, res) {
    const id = req.headers.authorization;

    const user = await connection("users")
      .where("id", id)
      .select("id")
      .first();

    if (user.id !== id) {
      return res.status(401).json({ error: "Operation not permitted" });
    }

    const posts = await connection("posts")
      .where("user_id", id)
      .select("*");
    const postIds = posts.map(post => post["id"]);

    await connection("categories_posts")
      .whereIn("categories_posts.post_id", postIds)
      .delete();
    await connection("posts")
      .where("user_id", id)
      .delete();
    await connection("users")
      .where("id", id)
      .delete();

    // return res.json(204).send();
    return res.redirect("/");
  }
};
