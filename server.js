const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Import Routes
const loginRoutes = require("./routes/loginRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Use Routes
app.use("/", loginRoutes);
app.use("/", messageRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/login`);
});
