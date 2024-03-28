const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const dbConnection = require('./connection.js');
const userRouter = require('./routes/user.js');
const blogRouter = require('./routes/blog.js');
const commentRouter = require('./routes/comment.js');
const { checkAuthenticationCookie } = require('./middleware/auth.js');
const Blog = require('./model/blog.js');
const app = express();
const PORT = process.env.PORT || 8000;

dbConnection().then(() => console.log('connection established')).catch((error) => console.log(error))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve('./public')))
app.use(checkAuthenticationCookie('token'))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRouter)

app.use('/blog', upload.single('coverImage'), blogRouter)

app.use('/comment', commentRouter)


app.listen(PORT, () => console.log('listening on port ' + PORT));