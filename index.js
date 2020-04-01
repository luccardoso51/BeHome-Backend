const express = require('express'),
      app = express();

const port = 3333;

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Home page');
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});