const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let LessonSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

LessonSchema.pre('save', function(next) {

  var Lesson = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Lesson.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Lesson.created_at){
    Lesson.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
LessonSchema.plugin(toJSON);
LessonSchema.plugin(paginate);
let Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;