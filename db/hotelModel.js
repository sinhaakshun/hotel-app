const mongoose = require('mongoose');



var hotelSchema = mongoose.Schema({
    hotelName : {
        type : String,
        required : true
    },
    hotelKind : {
        type : String,
        required : true
    }
})

const Hotel = mongoose.model('hotelData', hotelSchema);

module.exports = Hotel;