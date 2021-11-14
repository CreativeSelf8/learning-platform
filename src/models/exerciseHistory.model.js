const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let ExerciseHistorySchema = new Schema({
    user: { type: String },
    ExerciseHistory: { type: String },
    score : { type : Number },
    created_at: Date,
    updated_at: Date
});

ExerciseHistorySchema.pre('save', function (next) {

    var ExerciseHistory = this;
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    ExerciseHistory.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!ExerciseHistory.created_at) {
        ExerciseHistory.created_at = currentDate;
    }

    next();
});
// add plugin that converts mongoose to json
ExerciseHistorySchema.plugin(toJSON);
ExerciseHistorySchema.plugin(paginate);
let ExerciseHistory = mongoose.model('ExerciseHistory', ExerciseHistorySchema);

module.exports = ExerciseHistory;