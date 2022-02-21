//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 

//Load the 'index' controller
var student = require('../controllers/students.server.controller');
//
//handle routing for get and post request
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/student', student.render); //go to http://localhost:3000/student

};