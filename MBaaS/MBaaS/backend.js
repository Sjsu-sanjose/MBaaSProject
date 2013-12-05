/**
 * @author Abhinav
 */

var wrapper = require('./mongowrapper');
var uuid 	= require('node-uuid');
var mongo = require('mongodb');
var management = require('./management');
var dbname = "management";
var collection = "appaccounts";

var BSON = mongo.BSONPure;


// This method will insert a row in the collection in mongoDB.
exports.create = function(req,res)	{
	var key = req.params.id;
	//var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
	var collection = req.params.table;
	//var collection = 'mytable';
	management.authenticateAccount(key,function(flag) {
		if(flag)
		{
			var data = req.body;
			management.getapplicationdatabasename(key,function(appdbname) {
				wrapper.getCollection(appdbname,collection,function(err,item) {
					if(!err) {
					item.insert(data);
					}
					else {
					console.log("No collection returned");
					}
				});
			});
			
		}
		else {
			console.log("Account is not authenticated");
		}
	});	
};

//This method will remove a record from the collection in mongoDB.
exports.delete = function(req, res) {
    var key = req.params.id;
    //var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
    //var collection = 'mytable';
    //var rowid = '5296ed55deba6abc2c2c2ce3'; 
    var rowid = req.params.rowid;
    var collection = req.params.table;
    management.authenticateAccount(key,function(flag) {
    	if(flag) {
    		management.getapplicationdatabasename(key,function(appdbname) {
    			console.log('appdbname is ' +appdbname);
	    		wrapper.getCollection(appdbname,collection,function(err,item) {
	    			if(!err) {
	    				item.remove({'_id':BSON.ObjectID(rowid)},{safe:true},function(err, rows_removed) {
	    					if(!err) {
	    							if(rows_removed > 0)
	    							{
	    								console.log(rowid+' is removed');
	    							}
	    							else{
	    								console.log('No rows removed');
	    							}
	    					}
	    					else
	    					{
	    						console.log("No item found" + JSON.stringify(err.message));
	    					}	    					
	    				});	    						
	    			}
	    			else {
	    				console.log("No collection Found");
	    			}
	    		});
    		});
    	}
    	else {
    		console.log("Account is not authenticated");   		
    	}
    });
};

//This method will delete all rows from the collection in mongoDB.
exports.deleteall = function(req,res){
	var key = req.params.id;
	//var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
	var collection = req.params.table;
	//var collection = 'mytable';
	management.authenticateAccount(key,function(flag){
		if(flag) {
			//var data = req.body;
			management.getapplicationdatabasename(key,function(appdbname) {
				console.log('appdbname is ' +appdbname);
				wrapper.getCollection(appdbname,collection,function(err,item) {
					if(!err) { console.log('There is no error');
						//JSON.stringify(item);
						item.remove();
					}
					else {
						console.log("No Collection Found");
					}
				});
			});
		}
		else {
			console.log("Account is not authenticated");
		}	
});
}

exports.read = function(req,res)	{
	//var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
	var key = req.params.id;
	var rowid = req.params.rowid;
	//var rowid = '529d2b1a28b3b4a413db4995';
	var collection = req.params.table;
	//var collection = 'mytable'
	management.authenticateAccount(key,function(flag) {
		if(flag) {
			management.getapplicationdatabasename(key,function(appdbname) {
				wrapper.getCollection(appdbname,collection,function(err,item) {
					if(!err) {
							item.findOne({_id:BSON.ObjectID(rowid)},function(err,row) {
							JSON.stringify(row);
							res.send(row);
							});
					}
					else {
						console.log("No collection found");
					}
				});
		});
		}
		else{
			console.log("Account is not authenticated");
		}
	});
};


//exports.readall
exports.readAll = function(req, res) {
	var collection = req.params.table;
	var key = req.params.id;
	//var collection = 'mytable';
	//var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
	management.authenticateAccount(key,function(flag) {
		if(flag) {
			management.getapplicationdatabasename(key,function(appdbname) {
				wrapper.getCollection(appdbname,collection,function(err,item) {
					if(!err) {
						item.find().toArray(function(err, rows) {
							res.send(rows);// PRINT ALL ROWS FOR TESTING							
						});
					}
					else 
					{
						console.log("No Items Found");
					}
				});
			});
		}
		else
		{
			console.log("Account is not authenticated");
		}		
	});
};
    


exports.update = function(req, res) {
    var key = req.params.id;
    var rowid = req.params.rowid;
    var collection = req.params.table;
    //var key = 'f9c58230-57d8-11e3-9b94-cfee262f73ef';
	//var rowid = '529e9d9dd31ea9ec193bcf95';
	//var rowid;
	//var collection = 'mytable';
    management.authenticateAccount(key,function(flag) {
    	if(flag) {
		   var data = req.body;
    		management.getapplicationdatabasename(key,function(appdbname) {
	    		wrapper.getCollection(appdbname,collection,function(err,item) {
	    			if(!err) {
	    				item.update({'_id':new BSON.ObjectID(rowid)},data,function(err,result) {		
	    					if(err) {
	    						console.log('Error updating collection: '+JSON.stringify(err.message));
	    						res.send('error:An error has occured');
	    					}
	    					else {
	    						console.log('' + result + ' document(s) updated');
	                			res.send(data);
	    					}
	    				});
	    			}
	    			else
	    			{
	    				console.log('Item not found');
	    			}
	    		});
    		});
		}
		else {
    			console.log("Account is not authenticated");   		
    	}
	});
};	

exports.getStatistics = function(req,res)
{
	var key = req.params.id;
	management.getapplicationdatabasename(key,function(dbname) {
		management.getApplicationProfile(dbname,function(profile) {
			if(profile!=null) {
				res.send(profile);
			}
			else {
				console.log("No Statistics found");			
			}
		});
	});	
};


exports.setupAccount = function (req,res)
{
	var appname = req.params.name;
	management.createAccount(appname,function(key) 
	{
		if(key!=null)
			{	console.log(key);
				var data = {
					applicationkey:key,
					warning: 'please save this key to perform CRUD operations using MBaaS'
				}
				res.send(data);
			}
			else
			{
				console.log('No key generated');
			}
	});	
}
