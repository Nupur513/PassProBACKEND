const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const outpassSchema = new mongoose.Schema({
    outpassId: { type: String, default: uuidv4, unique: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    outDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    reason: { type: String, required: true },
    destination: { type: String, required: true }, // Added destination field
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    wardenComment: { type: String }
});

module.exports = mongoose.model('Outpass', outpassSchema);

