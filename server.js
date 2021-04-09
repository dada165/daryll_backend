const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const path = require('path');

const userRouter = require('./route/user')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

// app.get('/',(req,res) =>{
//     // res.send('<marquee><h1 style = "color:blue;font-family:monospace;font-size:50px">Daryll Gwapo</h1></marquee>')
//     res.sendFile(path.join(__dirname + '/index1.html'));
// })

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB connection is established.');
})

app.listen(port, () => {
    console.log('Server is runnning at port: ' + port);
});
