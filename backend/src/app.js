
//IMPORTS
// -- import third-party mod --
const express = require("express");
// -- import built-in mod --
const path = require("path");
// import local mod --
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const orgRouter = require('./routes/org');
const db = require('./config/db'); // for test only

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

// //for test only
// app.get("/test-db", async (req, res) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM user');
//         console.log("Database response:", rows);
        
//         res.json({ 
//             message: "db connection successful", 
//             table_data: rows 
//         });
//     } catch (err) {
//         console.error("db onnection failed:", err.message);
        
//         res.status(500).json({ 
//             message: "Database connection failed!", 
//             error: err.message 
//         });
//     }
// });

module.exports = app;