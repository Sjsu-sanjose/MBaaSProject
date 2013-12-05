/**
 * @author Abhinav
 * 
 * This file will hide the details of creating and opening the database and collections.
 */


var mongo = require('mongodb').Db;

var Server = require('mongodb').Server;

var server = new Server('localhost',27017,{auto_reconnect:true});
//var db = new Db(Config.dbName, new Server("127.0.0.1", 27017, {}), {safe: true});

// This module will create and connect to the database.
exports.createDB = function(dbname) {
    console.log('Creating Database : ' + dbname);
    var db = new mongo(dbname,server,{w:1,journal:false,fsync:false,safe: false});
    db.open(function(err, db) {
    if(!err) {
        console.log("Connected to : " + dbname);
        //return db;
    }
    db.close();
});
};
/*exports.createDB = function(req, res) {
    var dbName = req.params.name;
    console.log('Creating Database : ' + name);
    db = new Db(dbName, server);
    db.open(function(err, db) {
    if(!err) {
        console.log("Connected to : " + dbname);
        res.send(db);
    }
});
};*/

// This module will create the collection.
exports.createCollection = function(dbname,collectionname) {
	db = exports.createDB(dbname);
	var collection = db.createCollection(collectionname);
	res.send(collection);
};

exports.getCollection = function(req,res) {
	var dbname = req.params.dbname;
	var collectionName = req.params.collectionName;
	db = createDB(dbname);
	var collection = db.collection(collectionName);
	res.send(collection);	
};
