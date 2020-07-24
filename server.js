/* eslint-disable no-console */
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const config = require('./config/index')
const router = express.Router()
const DIST_DIR = path.join(__dirname, 'dist/')
var mongoose = require('mongoose');
const db = 'mongodb+srv://suvadeep95:ilove2CODE@cluster0-inxse.mongodb.net/smart_tv?retryWrites=true&w=majority'

mongoose.connect(db).then(() => {
    console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database'+ err)}
);



app.set('views', DIST_DIR)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static(DIST_DIR, {
    'index': false
}))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

require('./router/index.js')(DIST_DIR, app, router)
app.use('/', router)

app.listen(config.port)
console.log('Server Running on http://localhost:' + config.port)
