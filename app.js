require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes');
const cors = require("cors");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use('/', router);
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});