import express from "express";
import { status } from "minecraft-server-util";

const app = express();
const PORT = process.env.PORT || 3000;

const MC_HOST = "free-in2.peaknodes.in";
const MC_PORT = 19208;

let serverOnline = false;

// Function to check Minecraft server status
async function checkServer() {
    try {
        await status(MC_HOST, MC_PORT);
        serverOnline = true;
        console.log("✅ Minecraft server is ONLINE");
    } catch (error) {
        serverOnline = false;
        console.log("❌ Minecraft server is OFFLINE. Retrying...");
    }
}

// Check Minecraft server every 1 second
setInterval(checkServer, 1000);

// Express route for Uptime Robot
app.get("/", (req, res) => {
    if (serverOnline) {
        res.status(200).send("<h1>Minecraft Server is Online</h1>");
    } else {
        res.status(503).send("<h1>Site is Off (Minecraft Server is Offline)</h1>");
    }
});

// Start Express server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Web server running on port ${PORT}`);
});

// Initial check
checkServer();
