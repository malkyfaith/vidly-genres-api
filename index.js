const express = require('express');
const bodyParser = require('body-parser');

const { genresRoute } = require('./genres/')
// create app
const app = express();

// middleware
app.use(express.json());

app.use('/api/genres', genresRoute);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
