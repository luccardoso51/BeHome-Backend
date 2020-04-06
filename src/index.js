const express = require('express'),
      cors    = require('cors'),
      routes  = require('./routes'),
      app     = express();

const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});