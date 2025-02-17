const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.send(`
        <script>
            const username = localStorage.getItem("username");
            if (username) {
                window.location.href = "/";
            }
        </script>
        <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
            <button type="submit">Login</button>
        </form>
    `);
});

router.get("/", (req, res) => {
    res.send(`
        <script>
            const username = localStorage.getItem("username");
            if (!username) {
                window.location.href = "/login";
            }
        </script>

        <h1>Messages:</h1>
        <div id="messages"></div>
        <form action="/sendMessage" method="POST">
            <input type="hidden" name="username" id="usernameField" />
            <input type="text" name="message" placeholder="Enter message" required />
            <button type="submit">Send</button>
        </form>

        <script>
            document.getElementById("usernameField").value = localStorage.getItem("username");

            fetch('/getMessages')
                .then(response => response.text())
                .then(data => {
                    const messagesDiv = document.getElementById('messages');
                    messagesDiv.innerHTML = data.split("\\n").join(" | ");
                });
        </script>
    `);
});

module.exports = router;
