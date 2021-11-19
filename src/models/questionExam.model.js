const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let QuestionExamSchema = new Schema({
  title: { type: String, required: true },
  multiChoices: { type: [String] },
  answer: { type: String, required: true },
  description: { type: String },
  order: { type: Number},
  created_at: Date,
  updated_at: Date
});

QuestionExamSchema.pre('save', function (next) {

  var QuestionExam = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  QuestionExam.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!QuestionExam.created_at) {
    QuestionExam.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
QuestionExamSchema.plugin(toJSON);
QuestionExamSchema.plugin(paginate);
let QuestionExam = mongoose.model('QuestionExam', QuestionExamSchema);

module.exports = QuestionExam;