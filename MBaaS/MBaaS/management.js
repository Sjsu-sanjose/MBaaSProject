/**
 * @author Abhinav
 */

var wrapper = require('./mongowrapper');
var uuid 	= require('node-uuid');
var dbname = "management";//DO NOT CHANGE
var collection = "appaccounts";//DO NOT CHANGE

// This will create 'collection' in database 'management'.
exports.createManagementDB = function(req,res) {
	wrapper.createCollection(dbname,collection);
};

// This will create a new account against a new uuid
// TODO:Support robust database name creation.
exports.createAccount = function(applicationname,callback) { console.log("createAccount is called");
	var key = uuid.v1();// This will create a new uuid.
	//var applicationname = 'hello world';
	var appname = applicationname;
	console.log('key value in createaccount is ' +key);
	wrapper.getCollection(dbname,collection,function(err,item){
		if(!err){
			var appdbname = appname.replace(/\s+/g,'');
			var document = {_id:key,appname:appname,databasename:appdbname};
			item.insert(document);
			callback(key);
		}
		else{
			console.log("No collection returned");
			callback(null);
		}
	}	
	);	
};

//This will authenticate the account/ key is used for the same.
exports.authenticateAccount = function(key,callback){
	console.log("key value in authenticate account is : " + key);
	wrapper.getCollection(dbname,collection,function(err,mycollection) {
	mycollection.findOne({_id:key}, function(err,item) {
		if(item == null) {
			callback(false);
		}
		else {
			callback(true);
		}
 });
});
};

exports.getapplicationdatabasename = function(key,callback) { console.log('getapplicationdatabasename is called');
	wrapper.getCollection(dbname,collection,function(err,mycollection) {
		mycollection.findOne({_id:key},function(err,item) {
			if(item == null) {
				callback(err);
			} 
			else {
				callback(item.databasename);
			}	
		});
	});
};

//Account Statistics...number of tables....number of rows in each table....size of DB.....
exports.getApplicationProfile = function(appdbname, callback) 
{
        var profile;
        wrapper.getCollectionNames(appdbname,function(collections) { //get the name of all collections/tables in the database.
        if(collections != null && collections.length > 0){
            wrapper.getDBStats(appdbname, function(dbStats) { //get other stats of the database.    
            if(dbStats != null)
            {
                //build the profile JSON.
                profile = 
                {
                    collectionCount : collections.length,
                    collectionNames : collections,
                    stats : dbStats,
                    billing : '$' +( (collections.length*10) + (dbStats.numberofRows*1) )
                }
                console.log(JSON.stringify(profile));
                callback(profile);
            }
          });
        }
        else{
            console.log("Error in getApplicationProfile");
            callback(null);
        }
      });
}
