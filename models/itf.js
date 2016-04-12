//Mongo db adatmodell
//Kezeli a megadott tablat
var Itf;

function setModel(mongoose) {
    Itf = mongoose.model('itf', {
        name: String,
        email: String,
        order: {
            date: Date,
            amount: Number,
            status: String,
            product: String
        }
    });

//    var user = new Itf({
//        name: "Joe"
//    });
//    user.save();
}

//Adatok olvasása a kollekcióból
function read(where, callBack) {
    Itf.find(where, function (err, data) {
        if (err) {
            console.error('Error in query:', where);
            callBack({});
        } else {
            callBack(data);
        }
    });
}

module.exports = {
    setModel: setModel,
    read: read
};