const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 50000 // Increase timeout to 50 seconds
})
.then(() => {
    console.log("Conexión a MongoDB exitosa!");
})
.catch((err) => {
    console.error("Error de conexión a MongoDB:", err);
});

module.exports = mongoose;