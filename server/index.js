const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(port, () => console.log(`** PORT ${port} **`));

db.conn.sync();