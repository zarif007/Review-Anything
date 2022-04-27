const mongoose = require('mongoose');

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email needed'],
        unique: true,
        trim: true,
        maxlength: [50, ],
    },
    image: {
        type: String,
        require: [true, 'Image URL needed'],
        trim: true,
        maxlength: [500, ],
    },
    name: {
        type: String,
        require: [true, 'Name needed'],
        trim: true,
        maxlength: [50, ],
    },
    preference: {
        type: [String],
        require: [true, 'preference needed'],
        trim: true,
    },
})

module.exports = mongoose.models.Note || mongoose.model('User', UserSchema);
