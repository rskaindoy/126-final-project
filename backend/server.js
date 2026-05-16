//DESCRIPTION: imports app.js and tells server to listen on port: 3000

const app = require("./src/app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});