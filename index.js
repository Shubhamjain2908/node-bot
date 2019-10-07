const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

require('./routes/dialogFlowRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot listening on port ${PORT}!!!`)); 