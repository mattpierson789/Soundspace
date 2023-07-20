const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug');
const path = require('path');

const cors = require('cors');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');
require('./models/User');
require('./models/Track');
require('./models/Post'); 
require('./config/passport');

const passport = require('passport');
const usersRouter = require('./routes/api/users');
const tracksRouter = require('./routes/api/tracks');
const postsRouter = require('./routes/api/posts'); 
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());


// Security Middleware and CORS configuration
if (!isProduction) {
    app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Attach Express routers
app.use('/api/users', usersRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/posts', postsRouter); 
app.use('/api/csrf', csrfRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    });
});

module.exports = app;
