const 
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser')

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
  
// routes
require('./routes/user')(app)

// static files

app.listen(app.get('port'), () => {
  console.log(`Servidor en puerto ${app.get('port')}`);
})