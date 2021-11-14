const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const UserRequestSchema = mongoose.Schema(
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
UserRequestSchema.plugin(toJSON);
UserRequestSchema.plugin(paginate);

/**
 * @typedef UserRequest
 */
const UserRequest = mongoose.model('UserRequest', UserRequestSchema);

module.exports = UserRequest;
