const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let NewsSchema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

NewsSchema.pre('save', function (next) {

  var News = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  News.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!News.created_at) {
    News.created_at = currentDate;
  }

  next();
});
// add plugin that converts mongoose to json
NewsSchema.plugin(toJSON);
NewsSchema.plugin(paginate);
let News = mongoose.model('News', NewsSchema);

module.exports = News;