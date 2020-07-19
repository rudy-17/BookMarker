const mongoose = require('mongoose')

const BookMarkSchema = new mongoose.Schema({
    link:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:
    {
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model('bookmark',BookMarkSchema)