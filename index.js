const express = require('express');
const path = require('path');
const dbConnection = require('./connection.js');
const app = express();
const PORT = 8000;

dbConnection().then(() => console.log('connection established')).catch((error) => console.log(error))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'))

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    return res.end('hello world');
})


app.listen(PORT, () => console.log('listening on port ' + PORT));