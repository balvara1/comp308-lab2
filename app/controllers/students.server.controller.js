// Load the module dependencies
const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('../../config/config');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

exports.render = function (req, res) {    
    
    res.render('student', {
        title: 'Student Page'
    });   

};