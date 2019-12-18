const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');

const knex = require('../database/dbConfig');

const sessionConfig = {
    name: 'monkey', // sid
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 30,
        secure: false, //should be true in production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex,
        createtable: true,
        tablename: 'sessions',
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 10,
    })
};

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(session(sessionConfig));
    server.use(cors());
};