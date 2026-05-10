const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/home.html"));
    // res.send("API is running");
});

module.exports = app;