var createError = require('http-errors');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const mongoose = require('mongoose');



//const Account = mongoose.model('accounts');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// Setup database models
require('./app/model/Account');

// Setup the routes
require('./routes/authentication')(app);


// Conexión con la base de datos
mongoose.set('strictQuery', true);
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSS}@clustersnutri3dbd.9skyq9n.mongodb.net/${process.env.BD}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSS}@snutri3dcluster.brblj4q.mongodb.net/${process.env.BD}?retryWrites=true&w=majority`;
//const uri = "mongodb://localhost:27017";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((e) => {
    console.log("Error de conexióna a Base de datos", e);
  });
  

console.log(process.env.USER);

// Conexión con el servidor
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
