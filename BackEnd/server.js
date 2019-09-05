let express = require('express')
let cors = require('cors')
let app = express()
const path = require('path');
const auth = require('./routes/auth');
const user = require('./routes/user');

app.use(express.json())
app.use(cors())
app.use('/auth', auth)
app.use('/user', user)

app.use(express.static(path.join(__dirname, 'dist')));

let mongoose = require('mongoose')
let mongoDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/user/image/:name', async (req, res) => {
//   console.log(__dirname);
//   res.sendFile('C:\\Users\\emna\\Desktop\\Projet St\\projectBackEnd\\uploads\\'+ req.params.name)
//  });
app.listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.PORT)
})