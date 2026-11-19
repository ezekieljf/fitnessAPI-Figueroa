const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    duration: {
        type: String,
        required: [true, 'Duration is Required']
    },
    userId: {
        type: String,
        required: [true, 'User ID is required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model('Workout', WorkoutSchema);