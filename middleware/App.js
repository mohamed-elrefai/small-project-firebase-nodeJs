const express = require('express'),
      expressLayouts = require('express-ejs-layouts'),
      morgan = require('morgan'),
      cors = require('cors');

module.exports = app =>{
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public/css'));
    app.use(express.static('public/img'));
    app.use(express.static('public/js'));
    app.use(morgan('dev'));
    app.use(cors());
}
