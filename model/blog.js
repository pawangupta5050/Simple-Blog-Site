const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        unique: true,
    }
})

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog