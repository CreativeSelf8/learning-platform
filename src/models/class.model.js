const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let ClassSchema = new Schema({
  title: { type: String, required: true },
  blockId: { type: String, required: true },
  age: { type: Number, required: true },
  lectureIds: { type: [String], required: true },
  order: { type: Number, required: true },
  created_at: Date,
  updated_at: Date
});

ClassSchema.pre('save', function (next) {

  var Class = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Class.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Class.created_at) {
    Class.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
let Class = mongoose.model('Class', ClassSchema);

module.exports = Class;