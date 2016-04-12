// Beolvassuk a szukseges csomagokat
var express = require('express');
var fs = require('fs');

//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/superhero');

//tablak
var Users = require('./models/users');
Users.setModel(mongoose);
//Users.setModel(mongoose);
//Users.create({
//  name: 'John Doe',
//  email: 'john.doe@email.com',
//  phone: '+36204587775',
//  address: '1122 Budapest Kis utca 10',
//  role: 3,
//  meta: {
//    birthDay: new Date('1994-07-04'),
//    hobby: 'golf',
//  }
//}, function (user) {
//  console.info("Saved user:", user);
//});
Users.read({}, function (users) {
  console.info("users:", users);
});
//Global
var port = 3333;
var staticDir = 'build';
var stringType = 'utf8';

//Letrehozunk egy express server peldanyt
var app = express();

//Set
app.set('view engine', 'jade');
app.set('views', './src/views');

//statikus fajlok
app.use(express.static(staticDir));

//Definialjuk a server mukodeset
app.get('/', function (req, res) {
  handleUsers(req, res, false, function (allUser) {
    res.render('index', {
      title: 'Hey',
      message: 'Hello there!',
      users: allUser
    });
  });

})

//Felhasznalo modell
function handleUsers(req, res, next, callBack) {
  fs.readFile('./users.json', stringType, function (err, data) {
    if (err) throw err;

    //var path = req.url.split('/');
    var users = JSON.parse(data);

    if (callBack) callBack(users);


  });
}

//felhasznalok beolvasasa
app.get('/users/:id*?', function (req, res) {
  handleUsers(req, res);
});


//Megadjuk, hogy a szerver melyik portot figyelje
app.listen(port);
