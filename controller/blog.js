const Blog = require('../model/blog')

const handleGetBlogById = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findOne({ _id: blogId });
    return res.render('blog', {
        user: req.user,
        blog: blog,
    })
}

const handleBlogCreate = async (req, res) => {
    const {title, body, coverImageURL} = req.body;

    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })

    return res.redirect(`/blog/${blog._id}`)
}

module.exports = {
    handleBlogCreate,
    handleGetBlogById,
}