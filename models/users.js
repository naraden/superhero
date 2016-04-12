//Mongo db adatmodell
//Kezeli a megadott tablat
var Users;

function setModel(mongoose) {
  Users = mongoose.model('Users', {
    name: String,
    email: String,
    phone: String,
    address: String,
    role: Number,
    meta: {
      birthDay: Date,
      hobby: String,
    }
  });
}

//Adatok olvasása a kollekcióból
function read(where, callBack) {
  if (!where) where = {};
  Users.find(where, function (err, data) {
    if (err) {
      console.error('Error in query:', where);
      if (callBack) callBack({});
      if (callBack) callBack(data);
    }
  });
}

//Uj dokumentum beszurasa az adatbazisba
function create(document, callBack) {
  var user = new Users(document);
  user.save(function (err) {
    if (err) {
      console.error("save error", err);
      callBack({});
    } else {
      callBack(user);
    }
  });
}

module.exports = {
  setModel: setModel,
  read: read,
  create: create
};