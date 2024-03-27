const express = require('express');
const { handleBlogCreate, handleGetBlogById } = require('../controller/blog')
const router = express.Router();

router.get('/create', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
})

router.get('/:id', handleGetBlogById)

router.post('/', handleBlogCreate)

module.exports = router;