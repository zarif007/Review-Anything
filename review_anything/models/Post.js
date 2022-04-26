const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        email: {
            type: String,
            require: [true, 'Email needed'],

            trim: true,
            maxlength: [50, ],
        },
        username: {
            type: String,
            require: [true, 'Username needed'],

            trim: true,
            maxlength: [50, ],
        },
        image: {
            type: String,
            require: [true, 'DP needed'],

            trim: true,
            maxlength: [500, ],
        },
    },
    image: {
        type: String,
        require: [true, 'Image needed'],
        trim: true,
        maxlength: [500, ],
    },
    Title: {
        type: String,
        require: [true, 'Title needed'],
        trim: true,
        maxlength: [80, ],
    },
    review: {
        type: String,
        require: [true, 'Review needed'],
        trim: true,
        maxlength: [500, ],
    },
    genre: {
        type: String,
        require: [true, 'genre needed'],
        trim: true,
        maxlength: [50, ],
    },
    type: {
        type: String,
        require: [true, 'type needed'],
        trim: true,
        maxlength: [50, ],
    },
    rating: {
        type: String,
        require: [true, 'rating needed'],
        trim: true,
        maxlength: [50, ],
    },
    crowdRating: {
        type: String,
        require: [true, 'crowdRating needed'],
        trim: true,
        maxlength: [50, ],
    },
    timestamp: {
        type: Date,
        require: [false, 'crowdRating needed'],
        trim: true,
        maxlength: [50, ],
    },
    
});

module.exports = mongoose.models.Post || mongoose.model('Post', 
PostSchema);