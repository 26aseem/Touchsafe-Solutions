//Express and Mongoose
require('dotenv').config();

const express = require('express')
const app =express()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');



// Models are required
require('./models/user')
require('./models/post')

const mongoose = require('mongoose');

//Database connection is established
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DATABASE CONNECTED")
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes are required
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



//Port for listening
const port = process.env.PORT || 8000;

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port, () => {
    console.log("Server is running on ", port)
});