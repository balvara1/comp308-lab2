// Load the module dependencies
const Student = require("mongoose").model("Student");
const bcrypt = require("bcrypt");
const jwt = require("../../config/config");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

//
// Create a new error handling controller method
const getErrorMessage = function (err) {
  // Define the error message variable
  var message = "";

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = "Email already exists";
        break;
      // If a general error occurs set the message error
      default:
        message = "Something went wrong";
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

// Create a new student
exports.create = function (req, res, next) {
  // Create a new instance of the 'Student' Mongoose model
  var student = new Student(req.body); //get data from React form
  console.log("body: " + req.body.firstName);

  // Use the 'Student' instance's 'save' method to save a new student document
  student.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      res.json(student);
    }
  });
};
//
// Returns all students
exports.list = function (req, res, next) {
  // Use the 'Student' instance's 'find' method to retrieve a new user document
  // http://localhost:5000/students
  Student.find({}, function (err, students) {
    if (err) {
      return next(err);
    } else {
      res.json(students);
    }
  });
};
//
//'read' controller method to display a user
exports.read = function (req, res) {
  // Use the 'response' object to send a JSON response
  res.json(req.student);
};
//
// 'studentByID' controller method to find a student by its id
exports.studentByID = function (req, res, next, id) {
  // Use the 'Student' static 'findOne' method to retrieve a specific student
  Student.findOne(
    {
      _id: id,
    },
    (err, student) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.student' property
        req.student = student;
        console.log(student);
        // Call the next middleware
        next();
      }
    }
  );
};
//
// 'studentsByCourseCode' controller method to find students by CourseCode
exports.studentsByCourseCode = function (req, res, next, courseCode) {
console.log("getting studentsbycoursecode");
  Student.find({ "enrolledCourses.courseCode": courseCode }, (err, student) => {
    if (err) {
      return next(err);
    } else {
      // Set the 'req.student' property
      //req.student = student;
      res.json(student);
      console.log(student);
      // Call the next middleware
      next();
    }
  });
};
