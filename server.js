const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./dsolve/routes/userRoutes');

mongoose.connect('mongodb+srv://blogUser:blogPassword@testcluster.eik60.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/api/dsolve/user', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port);