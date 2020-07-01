
var MongoStore = require('connect-mongo');

module.exports.connectMongo = function(session){
    return MongoStore(session);
}