import express from "express";
import { status } from "minecraft-server-util";

const app = express();
const PORT = process.env.PORT || 3000;

// Your Minecraft server details
const MC_HOST = "free-in2.peaknodes.in";
const MC_PORT = 19208;

let serverOnline = false;

async function checkServer() {
    try {
        await status(MC_HOST, MC_PORT);
        serverOnline = true;
        console.log("✅ Minecraft server is ONLINE");
    } catch (error) {
        serverOnline = false;
        console.log("❌ Minecraft server is OFFLINE. Shutting down...");
        process.exit(1); // Stop the app when MC server is offline
    }
}

// Check server every 1 second
setInterval(checkServer, 1000);

// Express route (Only works when the app is running)
app.get("/", (req, res) => {
    res.status(200).send("<h1>Minecraft Server is Online</h1>");
});

// Start the web server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Web server running on port ${PORT}`);
});

// Initial check
checkServer();
