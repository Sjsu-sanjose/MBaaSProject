/**
 * @author Abhinav
 */

var wrapper = require('./mongowrapper');
var uuid 	= require('node-uuid');
var dbname = "management";
var collection = "appaccounts";

// This will create 'collection' in database 'management'.
exports.createManagementDB = function(req,res) {
	wrapper.createDB(dbname);
	//wrapper.createCollection(dbname,collection);
};

// This will create a new account against a new uuid
exports.createAccount = function(req,res) {
	var key = uuid.v1();// This will create a new uuid.
	wrapper.createDB(key);//This will create a new database 'key'.
	var mc = wrapper.getCollection(dbname,collection);// This will get a reference to 'appaccounts' collection.
	mc.insert({_id:key},{appname:req.params.applicationname});// This will store a new account in 'appaccounts'.
	res.send(key);//This will return the key to the caller of CreateAccount.	
};

//Thsi will authenticate the account
exports.authenticateAccount = function(req,res){
	var key = req.params.key;
	var mc = wrapper.getCollection(dbname,collection);
	mc.findOne({_id:key}, function(err, item) {
		if(item == null) {
			res.send(false);
		}
		else {
			res.send(true);
		}
 });
};
