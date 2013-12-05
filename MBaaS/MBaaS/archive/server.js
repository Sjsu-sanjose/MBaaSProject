/**
 * @author Abhinav
 */

var express = require('express'),
    management = require('./management');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 

app.get('/createManagementDB', management.createManagementDB);
app.put('/createAccount/:name',management.createAccount); 
app.listen(4000);
console.log('Listening on port 4000...');