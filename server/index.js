require('dotenv-flow').config();
const express = require('express');
const session = require('express-session');

const port = process.env.PORT || 5000;

const app = express();
app.use(require('cors')());
app.use(express.json());

app.use(session({
	secret: 'to-do-list',
	cookie: { maxAge: 60000 },
	resave: false,
	saveUninitialized: false
}));

require('./models');
require('./config/mongo');
require('./config/passport');

app.use(require('./routes/index'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
