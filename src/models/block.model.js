const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

let BlockSchema = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true, unique: true },
  classIds: { type: [String], required: true },
  created_at: Date,
  updated_at: Date
});

BlockSchema.pre('save', function (next) {

  var Block = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Block.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Block.created_at) {
    Block.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
BlockSchema.plugin(toJSON);
BlockSchema.plugin(paginate);
let Block = mongoose.model('Block', BlockSchema);

module.exports = Block;