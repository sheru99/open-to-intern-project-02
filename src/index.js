// const express = require("express");
// const app = express();
// const bodyparser = require("body-parser");

// const route = require("./route/route");
// const mongoose = require("mongose");

// app.use(bodyparser.json());
// app.use("/", route);

// mongoose
//   .connect(
//     "mongodb+srv://Mohammadvaseem099:uDNTAkafkNrYLe0C@cluster0.2npclft.mongodb.net/Mohammadvaseem099",
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB is Connected"))
//   .catch((err) => console.log(err));

// app.listen(3210, function () {
//   console.log("Express is connected in port:" + 3210);
// });

// const app = express();

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
