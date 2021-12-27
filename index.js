const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server_mongodb = require('./server_mongodb/mongodb');

const drink = require('./models/drink');

app.set("view engine", "ejs");

//  app.use('js/style', express.static(__dirname + "js/style"));

const router = require('./router')(app, drink);

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});