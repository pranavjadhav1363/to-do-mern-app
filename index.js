const express = require('express');
const mongoose = require('mongoose');
// const ConnectToMongo = require('./database/db');
require('dotenv').config()
const UserLoginSignup = require('./routes/userLoginSignup')

// ConnectToMongo();
const app = express();
app.use(express.json())


const port = process.env.PORT || 5000;
const uri = process.env.DATABASE;

mongoose.connect(uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
});

// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//     app.use(express.static('client/build'));
// }

// ----------------------------ROUTERS--------------------------------------
// ROUTER FOR LOGIN AND SIGNUP
app.use('/', require('./routes/userLoginSignup'))


//ROUTER TO PERFORM CURD OPERATION
app.use('/task', require('./routes/NotesCURD'))





app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
})