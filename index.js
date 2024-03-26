const express = require('express');
const path = require('path');
const dbConnection = require('./connection.js');
const userRouter = require('./routes/user.js')
const app = express();
const PORT = 8000;

dbConnection().then(() => console.log('connection established')).catch((error) => console.log(error))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    return res.render('home');
})

app.use('/user', userRouter)


app.listen(PORT, () => console.log('listening on port ' + PORT));