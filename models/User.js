const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, unique: true, required: true }, // Define userId as unique and required
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'warden'] },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);




