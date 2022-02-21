const express = require('express'),
      app = express(),
      Admin = require('./firebase'),
      auth = require('./router/auth');
require('dotenv').config();


// Middleware
require('./middleware/App')(app);

// Router
app.use(auth)

// Get Main Page
app.get('/', (req, res)=>{
    res.render('index')
})

// Port
const port = process.env.PORT || 1999;
app.listen(1999, ()=>{
    console.log(`http://localhost:${port}`)
})