//-------------Import Modules:-------------------------------------------//
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

//---------------Bind Application Level Middleware:-----------------------------//
app.use(bodyParser.json());
app.use(multer().any());


//----------------------Connecting Data-Base:-------------------------------------------//
mongoose.connect("mongodb+srv://project2group41:8vsByDXMeUlCc7Fw@cluster0.uax0wkc.mongodb.net/project_OpenToIntern", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)

//-----------------------------------------Binding Connecting on port:-------------------------------------------//
app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});