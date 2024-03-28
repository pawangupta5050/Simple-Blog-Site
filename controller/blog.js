const Blog = require('../model/blog');
const Comment = require('../model/comment');

const handleGetBlogById = async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate("createdBy");
    const comments = await Comment.find({blogId}).populate("createdBy");
    return res.render('blog', {
        user: req.user,
        blog: blog,
        comments: comments,
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