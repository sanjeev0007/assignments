var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = 3000;

var bodyParser = require('body-parser');
//to make data in JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

//for connecting to database and create datanase of name "first"
mongoose.connect('mongodb://localhost:27017/first', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//schema of user
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

//model of schema
var User = mongoose.model('User', nameSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/addname', (req, res) => {
  var myData = new User(req.body);
  // Save user/data to database by the help of simple form of firstname and lastname(index.html)
  myData
    .save()
    .then((item) => {
      res.send('Name saved to database');
    })
    .catch((err) => {
      res.status(400).send('Unable to save to database');
    });
});

// Retrive the users form Database in console
app.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (!err) {
      res.send(users);
    } else {
      res.send(err);
    }
  });
});

// app.get('/users', (req, res) => {
//   User.find({}, function (err, users) {
//     if (err) {
//       console.log('THATS ERROR :( !!');
//       console.log(err);
//     } else {
//       console.log('ALL THE USERS.....');
//       console.log(users);
//     }
//   });
// });

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
