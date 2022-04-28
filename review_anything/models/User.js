const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    theme: {
        type: Boolean,
        default: true,
        require: [true, 'Name needed'],
        trim: true,
    },
    preference: {
        type: [String],
        default: [],
        require: [true, 'preference needed'],
        trim: true,
    },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
