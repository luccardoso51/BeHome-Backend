const express = require('express'),
      routes  = require('./routes'),
      app = express();

const port = 3333;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});