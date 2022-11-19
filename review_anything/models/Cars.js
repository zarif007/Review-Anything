const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        require: [true, 'brand needed'],
        unique: false,
        trim: true,
        maxlength: [80, ],
    },
    model: {
        type: String,
        require: [true, 'model needed'],
        unique: false,
        trim: true,
        maxlength: [80, ],
    },
    owner: {
        type: String,
        require: [true, 'owner needed'],
        unique: false,
        trim: true,
        maxlength: [80, ],
    },
}, { timestamps: true });

module.exports = mongoose.models.Car || mongoose.model('Car', CarSchema);