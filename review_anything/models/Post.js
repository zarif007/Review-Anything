const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        email: {
            type: String,
            require: [true, 'Email needed'],
            unique: false,
            trim: true,
            maxlength: [50, ],
        },
        username: {
            type: String,
            require: [true, 'Username needed'],
            unique: false,
            trim: true,
            maxlength: [50, ],
        },
        image: {
            type: String,
            require: [true, 'DP needed'],
            unique: false,
            trim: true,
            maxlength: [500, ],
        },
    },
    img: {
        type: String,
        require: [true, 'Image needed'],
        unique: false,
        trim: true,
        maxlength: [1000, ],
    },
    title: {
        type: String,
        require: [true, 'Title needed'],
        unique: false,
        trim: true,
        maxlength: [80, ],
    },
    review: {
        type: String,
        require: [true, 'Review needed'],
        unique: false,
        trim: true,
        maxlength: [500, ],
    },
    genre: {
        type: String,
        require: [true, 'genre needed'],
        unique: false,
        trim: true,
        maxlength: [50, ],
    },
    type: {
        type: String,
        require: [true, 'type needed'],
        unique: false,
        trim: true,
        maxlength: [50, ],
    },
    rating: {
        type: String,
        require: [true, 'rating needed'],
        unique: false,
        trim: true,
        maxlength: [50, ],
    },
    interactions: {
        approvedBy: {
            type: [String],
            require: [true, 'Approve need'],
        },
        crowdRatings: {
            type: [Object],
            require: [true, 'crowdRating needed'],
        },
    }
}, { timestamps: true });

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);