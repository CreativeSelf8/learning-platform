const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Schema = mongoose.Schema;

let UserProgressSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    UserProgressIds: { type: [String], required: true },
    created_at: Date,
    updated_at: Date
});

UserProgressSchema.pre('save', function (next) {

    var UserProgress = this;
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    UserProgress.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!UserProgress.created_at) {
        UserProgress.created_at = currentDate;
    }

    next();
});
// add plugin that converts mongoose to json
UserProgressSchema.plugin(toJSON);
UserProgressSchema.plugin(paginate);
let UserProgress = mongoose.model('UserProgress', UserProgressSchema);

module.exports = UserProgress;