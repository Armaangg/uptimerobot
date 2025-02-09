const express = require("express");
const { status } = require("minecraft-server-util");

const app = express();
const PORT = process.env.PORT || 3000;

const MC_HOST = "free-in2.peaknodes.in"; // Change this
const MC_PORT = 19208;

let serverOnline = false;

async function checkServer() {
    try {
        await status(MC_HOST, MC_PORT);
        serverOnline = true;
    } catch (error) {
        serverOnline = false;
    }
}

setInterval(checkServer, 1000);

app.get("/", (req, res) => {
    if (serverOnline) {
        res.status(200).send("<h1>Minecraft Server is Online</h1>");
    } else {
        res.status(503).send("<h1>Site is Off (Minecraft Server is Offline)</h1>");
    }
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

checkServer();
