/**
 * Created by kaspe on 2017-01-06.
 */
let User = require("./User");
let mongoose = require("mongoose");
let dbConnectionString = "mongodb://127.0.0.1:27017";

let newUser = function (name, userName, password)
{
    console.log("i newUser");
    let usr = new User({
        name: name,
        username: userName,
        password: password
    });

    usr.save(function (err)
    {
        if (err)
        {
            console.log("error i save!: " + err);
        }
    });

};


let deleteUserByUsername = function (username)
{

    console.log("i deleteUser");

    User.findOneAndRemove({username: username}, function (err)
    {
        if (err)
        {
            console.log("err i delete: " + err);
        }
        else
        {
            console.log("user deleted!");
        }
    });
};


let updateUsername = function (oldUserName, newUserName)
{

    User.findOneAndUpdate({username: oldUserName}, {username: newUserName}, function (err, user)
    {
        if (err)
        {
            console.log("err i update userName: " + err)
        }

        // we have the updated user returned to us
        console.log(user);
    });

};


let findUserByUsername = function (username, callback)
{

    User.find({username: username}, function (err, user)
    {
        if (err)
        {
            console.log("err i findUserByUsername: " + err)
        }

        console.log("her er den fundne user: " + user);
        callback(user);
    });

};

let findAll = function (callback)
{
    console.log("i findall facade!")
    User.find({}, function (err, users)
    {
        console.log("i findall facade tier 2!");
        if (err)
        {
            console.log("err i findAll: " + err)
        }
        else
        {
            callback(users);
        }
    });
};


module.exports = {
    newUser: newUser,
    deleteUserByUsername: deleteUserByUsername,
    updateUsername: updateUsername,
    findUserByUsername: findUserByUsername,
    findAll: findAll
}