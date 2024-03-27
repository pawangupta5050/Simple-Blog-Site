const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
    body: {
        type: 'string',
        required: true,
    },
    coverImageURL: {
        type: 'string',
        required: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;