const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const messagesFile = path.join(__dirname, "../messages.txt");

// Ensure the messages file exists
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, "");
}

// Send a message (append to text file)
router.post("/sendMessage", (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.redirect("/");
    }

    // Append new message to the text file
    fs.appendFileSync(messagesFile, `${username}: ${message}\n`);

    res.redirect("/");
});

// Get messages (read from text file)
router.get("/getMessages", (req, res) => {
    try {
        const data = fs.readFileSync(messagesFile, "utf8");
        res.send(data);
    } catch (error) {
        console.error("Error reading messages file:", error);
        res.send("");
    }
});

module.exports = router;
