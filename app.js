const express = require('express');
const app = express();
const path = require('path');
const user = require('./routes/users');
const subject = require('./routes/subjects');
// const myexam = require('./routes/myexams');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors =require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require ('./config/passport')(passport);


const config = require('./config/database');
const connection = mongoose.connect(config.database);
    if (connection){
        console.log('database connected');
    }else{
        console.log('database not connected');
    }




app.use(express.static(path.join(__dirname,"public")));

app.use('/user',user);
app.use('/subject',subject);
// app.use('/myexam',myexam);

app.get("/",function(req,res){
    res.send("hello wold");
});


app.listen(3000,function(){
    console.log("listen to port 3000");
});