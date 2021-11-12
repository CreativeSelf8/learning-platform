const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let ExerciseSchema = new Schema({
  title: { type: String },
  questionIds: { type: [String], required: true },
  created_at: Date,
  updated_at: Date
});

ExerciseSchema.pre('save', function (next) {

  var Exercise = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Exercise.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Exercise.created_at) {
    Exercise.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
ExerciseSchema.plugin(toJSON);
ExerciseSchema.plugin(paginate);
let Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;