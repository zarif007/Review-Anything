export const mongoose = require('mongoose');

const UserSchema = new mongoose.Shema({
    email: {
        type: String,
        require: [true, 'Email needed'],
        unique: true,
        trim: true,
        maxLength: [50, ],
    },
    image: {
        type: String,
        require: [true, 'Image URL needed'],
        trim: true,
        maxLength: [500, ],
    },
    name: {
        type: String,
        require: [true, 'Name needed'],
        trim: true,
        maxLength: [50, ],
    },
    username: {
        type: String,
        require: [true, ],
        trim: true,
        maxLength: [50, 'UserName needed'],
    }
})

module.exports = mongoose.models.Note || mongoose.model('User', 
UserSchema);
