const express = require('express');
const bodyParser = require('body-parser');
require('./db/db');
const { genresRoute } = require('./genres/');
const { customerRoute } = require('./customer/');
// create app
const app = express();

// middleware
app.use(express.json());

app.use('/api/genres', genresRoute);
app.use('/api/customer', customerRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
