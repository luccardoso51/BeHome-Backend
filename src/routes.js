const express     = require('express'),
      crypto      = require('crypto'),
      connection  = require('./database/connection'),  
      routes  = express.Router();

routes.get('/users', async(req, res) => {
  const users = await connection('users').select('*');

  return res.json(users);
});

routes.post('/users', async (req, res) => {
  const {name, email} = req.body;
  const id = crypto.randomBytes(4).toString('HEX');

  await connection('users').insert({
    id,
    name,
    email
  });

  return res.json({ id });
});

module.exports = routes;