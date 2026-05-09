
//IMPORTS
// -- import third-party mod --
const express = require("express");
// -- import built-in mod --
const path = require("path");
// import local mod --
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const orgRouter = require('./routes/org');

const app = express(); 
app.use(express.json()); //translates req into json format

//load router mod to app
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/org', orgRouter);




// serve frontend files
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/home.html"));
    // res.send("API is running");
});

module.exports = app;