const mongoose = require('mongoose');
const courseModel = require('../models/course_Model')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidData = function (value) {
    if (typeof (value) === "string" && (value).trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

//_____________________________________________________Add courses_______________________________________________________
const createCourse = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "requst body is empty"
        })

        if (!isValid(data.course_Name)) {
            return res.status(400).send({
                status: false,
                msg: "course name is mandatory"
            })
        }

        if (!isValid(data.duration)) {
            return res.status(400).send({
                status: false,
                msg: "duration is mandatory"
            })
        }

        if (!isValid(data.topics)) {
            return res.status(400).send({
                status: false,
                msg: "Topics is mandatory"
            })
        }

        if (!isValid(data.price)) {
            return res.status(400).send({
                status: false,
                msg: "price is mandatory"
            })
        }

        const savedData = await courseModel.create(data)
        res.status(200).send({ status: true, message: savedData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//_____________________________________________________Update courses_______________________________________________________

const updateCourse = async function (req, res) {
    try {
        const data = req.body;
        const courseId = req.params.id

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "requst body is empty"
        })

        if (!isValidObjectId(courseId)) {
            return res.status(400).send({
                status: false,
                msg: "courseId is not valid"
            })
        }

        if (!await courseModel.findOne({ _id: courseId })) {
            return res.status(400).send({
                status: false,
                msg: "course is not available"
            })
        }

        if (!isValidData(data.course_Name)) {
            return res.status(400).send({
                status: false,
                msg: "course name is mandatory"
            })
        }

        if (!isValidData(data.duration)) {
            return res.status(400).send({
                status: false,
                msg: "duration is mandatory"
            })
        }

        if (!isValidData(data.topics)) {
            return res.status(400).send({
                status: false,
                msg: "topics is mandatory"
            })
        }

        if (!isValidData(data.price)) {
            return res.status(400).send({
                status: false,
                msg: "price is mandatory"
            })
        }

        let savedData = await courseModel.findOneAndUpdate({ userId: courseId }, data, { new: true })
        res.status(201).send({
            status: true,
            msg: " course updated successfully",
            msg2: savedData
        })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//_____________________________________________________get all courses_______________________________________________________


const getCourse = async (req, res) => {
    try {
        const data = await courseModel.find()
        res.status(200).send({ status: true, data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//_____________________________________________________get indivisual course by id_______________________________________________________

const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id
        if (!isValidObjectId(courseId)) {
            return res.status(400).send({
                status: false,
                msg: "courseId is not valid"
            })
        }

        if (!await courseModel.findOne({ _id: courseId })) {
            return res.status(400).send({
                status: false,
                msg: "course is not available"
            })
        }

        const data = await courseModel.findOne({ _id: courseId })
        res.status(200).send({ status: true, data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//_____________________________________________________exporting files_______________________________________________________

module.exports.createCourse = createCourse
module.exports.getCourse = getCourse
module.exports.getCourseById = getCourseById
module.exports.updateCourse = updateCourse



