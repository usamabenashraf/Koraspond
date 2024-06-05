const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send('Hello Koraspond!');
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
