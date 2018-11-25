const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db');

app.listen(port, () => console.log(`** PORT ${port} **`));

db.conn.sync();