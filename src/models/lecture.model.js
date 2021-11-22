const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let LectureSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  classId: { type: String, required: true },
  lessonIds: { type: [String], required: true },
  order: { type: Number, required: true },
  description: { type: String},
  created_at: Date,
  updated_at: Date
});

LectureSchema.pre('save', function (next) {

  var Lecture = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Lecture.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Lecture.created_at) {
    Lecture.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
LectureSchema.plugin(toJSON);
LectureSchema.plugin(paginate);
let Lecture = mongoose.model('Lecture', LectureSchema);

module.exports = Lecture;