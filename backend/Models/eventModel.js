const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    details: {
        type: String
    },
    location: {
        type: String,
    },
    startDateTime: {
        type: Date
    },
    endDateTime: {
        type: Date
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    }
}, {
    timestamps: true
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = { eventModel };