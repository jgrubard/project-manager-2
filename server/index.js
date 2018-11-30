require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use('/api', require('./routes'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(port, () => console.log(`** PORT ${port} **`));

db.conn.sync();