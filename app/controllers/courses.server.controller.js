const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

exports.render = function (req, res) {    
    
    res.render('course', {
        title: 'Course Page'
    });   

};