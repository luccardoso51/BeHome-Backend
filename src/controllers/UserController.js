const crypto      = require('crypto'),
      connection  = require('../database/connection');

module.exports = {
  async index(req, res) {
    const users = await connection('users').select('*');
  
    return res.json(users);
  },
  async create(req, res) {
    const {name, email} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('users').insert({
      id,
      name,
      email
    });
  
    return res.json({ id });
  }
};