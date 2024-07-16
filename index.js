const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin1234@dominic.rbrnew9.mongodb.net/Blog-App-System?retryWrites=true&w=majority&appName=Dominic');

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log(`We're connected to the database`));

app.use("/users", userRoutes);
app.use("/blog", blogRoutes);


if(require.main === module) {
    app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = { app, mongoose };