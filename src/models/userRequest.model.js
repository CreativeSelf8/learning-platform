const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const UserProgressSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        birth: {
            type: String,
            default: false,
        },
        address: {
            type: String,
            default: false,
        },
        class: {
            type: String,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
UserProgressSchema.plugin(toJSON);
UserProgressSchema.plugin(paginate);

/**
 * @typedef UserProgress
 */
const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

module.exports = UserProgress;
