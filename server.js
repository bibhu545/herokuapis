const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRoutes = require('./dsolve/routes/userRoutes');

mongoose.connect('mongodb+srv://blogUser:blogPassword@testcluster.eik60.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use((req, res, next) => {
    req.header('Access-Control-Allow-Orgin', '*');
    req.header('Access-Control-Allow-Heasers', 'Origin, X-Requested-With, Accept, Autherization');
    if (req.method == 'OPTIONs') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})

app.use('/api/dsolve/user', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port);