/**
 * @author Abhinav
 */

var wrapper = require('mongowrapper');
var uuid 	= require('node-uuid');
var dbname = "management";
var collection = "appaccounts";

exports.create = function(req,res)	{
	var key = uuid.v1();// This will create a new uuid.
	wrapper.createDB(key);//This will create a new database 'key'.
	var mc = wrapper.getCollection(dbname,collection);// This will get a reference to 'appaccounts' collection.
	mc.insert({_id:key},{appname:req.params.applicationname});// This will store a new account in 'appaccounts'.
	res.send(key);//This will return the key to the caller of CreateAccount.	
};

exports.read = function(req,res)	{
	app.get('/appaccounts/:id',function(req,res){
	db.collection("appaccounts",function(err,collection){
    console.log(req.params.id);
    collection.findOne({_id: req.params.id},function(err, doc) {
        if (doc){
            console.log(doc._id);
        } else {
            console.log('no data');
        }
    });
});
});
	
};
