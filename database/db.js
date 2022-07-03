const mongoose = require('mongoose');
const ConnectToMongo = async () => {
    mongoose.connect("mongodb://localhost:27017/to-do-pranav", () => {
        console.log("database connected successfully")
    })
}

module.exports = ConnectToMongo