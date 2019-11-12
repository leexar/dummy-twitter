const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoute);
app.use('/posts', postRoute);

app.listen(3000, function () {
    console.log('App listening on port 3000.');
});