const express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer')

const route = require('./routes/route')
const app = express();
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://project2group41:8vsByDXMeUlCc7Fw@cluster0.uax0wkc.mongodb.net/project_OpenToIntern", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
app.use('/', route);
app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});


