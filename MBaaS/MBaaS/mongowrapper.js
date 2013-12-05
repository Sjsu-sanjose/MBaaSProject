/**
 * @author Abhinav
 * 
 * This file will hide the details of creating and opening the database and collections.
 */


var mongo = require('mongodb').Db;
var Server = require('mongodb').Server;

// This module will create and connect to the database.
exports.createDB = function(dbname) {
    console.log('Creating Database : ' + dbname);
    var server = new Server('localhost',27017,{auto_reconnect:true});
    var db = new mongo(dbname,server,{w:-1,journal:true,fsync:true,safe: true});
    db.open(function(err, db) {
    if(!err) {
        console.log("Connected to : " + dbname);
    }
});
};


// This module will create the collection.
exports.createCollection = function(dbname,collectionname) {
    console.log('Collection created is : ' + collectionname);
    //exports.createDB(dbname);
    var server = new Server('localhost',27017);    
    db = new mongo(dbname,server, {safe:false});
    db.open(function(err, db) {
    if(!err) {
        console.log("Connected to : " + dbname);
            db.createCollection(collectionname, {capped:false, size:10000, max:1000, w:1}, function(err, collection) {
    if(!err)
    {
        console.log("Created collection");
    }
    else
    {
        console.log(JSON.stringify(err));
    }
    return collection;
    })
   }
});    
};

// This module will return the reference to the requested collection back to the caller.
exports.getCollection = function(dbname,collectionname,callback) { console.log("getCollection called");
	var server = new Server('localhost',27017); 
	db = new mongo(dbname,server,{safe:false});
	db.open(function(err,db){
		if(!err) {
			console.log("Connected to : " + dbname);
			db.collection(collectionname,function(err, mycollection) {
			if(!err) {
				callback(null,mycollection);
			} else {
				console.log(JSON.stringify(err));
				callback(err,null);
			  }
		})
	}		
});
};

// Return the collection names in a database.
exports.getCollectionNames = function(dbname, callback)
{
    console.log("getNumberCollectionCount called");
    var server = new Server('localhost',27017); 
    db = new mongo(dbname,server,{safe:false});
    db.open(function(err,db){
        if(!err) {
            console.log("Connected to : " + dbname);
            db.collectionNames(function(err, items) {
            if(!err) {
                callback(items);
            } else {
                console.log(JSON.stringify(err));
                callback(null);
              }
        })
    }        
});
};

//Return stats about the database.
exports.getDBStats = function(dbname, callback)
{
    var dbStats;
    console.log("getDBStats called");
    var server = new Server('localhost',27017); 
    db = new mongo(dbname,server,{safe:false});
    db.open(function(err,db){
    if(!err) {
        db.stats(function(err, stats) 
        {
            if(!err)
            {
                dbStats = 
                {
                    dbname : stats.db,
                    numberofRows : stats.objects,
                    dataSize : stats.dataSize,
                }
                callback(dbStats);
            }
        })
    }
    else
        callback(null);
});    
};