/**
 * Created by kaspe on 2017-01-06.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});


var User = mongoose.model('User', userSchema);

//
// var chris = new User({
//     name: 'Chris',
//     username: 'sevilayha',
//     password: 'password'
// });

module.exports = User;