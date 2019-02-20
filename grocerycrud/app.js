var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDB');
var dbSchema = mongoose.Schema({
    objID : String,
    productName : String,
    price : String,
    quantity: Number
});
var Document = mongoose.model('Document', dbSchema);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//get attributes
app.get('/index', function(req, res,) {
    res.render('index', { title: 'Express' });
});

// listing page
app.get('/listing', function(req, res,) {
    Document.find({}, function(err,docs){
    res.render('listing', {
        title: 'Database Records',
        fetchedDocs: docs
      });
    });
});

// entry page update
app.get('/entry', function(req, res,) {
    res.render('entry', { title: 'Add' });
});

app.post('/saveit',
    function (req,res) {
        var doc2save = new Document({
            objID : req.body.id_name,
            productName : req.body.product_name,
            price : req.body.price_name,
            quantity: req.body.quantity_name
        });
        doc2save.save(function (err) {
            if(!err){
                res.redirect('/entry');
            }
            else {
                res.redirect('/entry')
            }
        });
    });

app.get('/update', function(req, res,) {
    res.render('update', { title: 'Update' });
});

app.post('/updated/',
    function(req, res) {
        Document.update({objID: req.body.updid_name}, {
            objID: req.body.updid_name,
            productName: req.body.updproduct_name,
            price: req.body.updprice_name,
            quantity: req.body.updquantity_name
        }, function (err, obj) {
            if (!err) {
                res.redirect('/update');
            }
            else {
                res.send(err)
            }
        });
    });


app.get('/delete', function(req, res,) {
    res.render('delete', { title: 'Delete' });
});

app.post('/deleted/',
    function(req, res) {
        Document.remove({objID: req.body.delid_name},
            function (err, obj) {
                if (!err) {
                    res.redirect('/update');
                }
                else {
                    res.send(err)
                }
            })
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
