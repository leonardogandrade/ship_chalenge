const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

app.use('/V1',require('./src/routes'));


app.listen(3000);
console.log('server listen on port 3000');