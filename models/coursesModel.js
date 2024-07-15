const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: { type: String, required: true },
    courseFee: { type: Number, required: true },
    courseDuration: { type: String, required: true },
    courseUploadDate: { type: Date, default: Date.now },
    courseValidUpto: { type: String, required: true },
    addedBy: {
        username: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true }
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;