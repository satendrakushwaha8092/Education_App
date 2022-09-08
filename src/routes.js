const express = require("express")
const router = express.Router()
const education_controller=require('./controllers/course_Controller')

router.post('/create',education_controller.createCourse);  //create new courses
router.get('/availablecourses',education_controller.getCourse);  //get all courses
router.get('/getcourse/:id',education_controller.getCourseById);  //get course by id
router.post('/update/:id',education_controller.updateCourse);  //update course using id

module.exports = router;