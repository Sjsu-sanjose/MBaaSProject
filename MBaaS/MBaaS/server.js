/**
 * @author Abhinav
 */

var express = require('express'),
    management = require('./management'),
    backend = require('./backend')
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/setupAccount/:name',backend.setupAccount);
//app.get('/createAccount',management.createAccount);
app.get('/createManagementDB', management.createManagementDB);
app.post('/create/:id/:table',backend.create);
app.get('/read/:id/:rowid/:table',backend.read);
app.get('/delete/:id/:rowid/:table',backend.delete);
app.get('/deleteall/:id/:table',backend.deleteall);
app.put('/update/:id/:rowid/:table',backend.update);
app.get('/readAll/:id/:table',backend.readAll);
app.get('/getStatistics/:id',backend.getStatistics);
app.listen(4000);
console.log('Listening on port 4000...');