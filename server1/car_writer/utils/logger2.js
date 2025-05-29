const fetch = require("node-fetch");

async function logToServer2(action, data) {
  try {
    await fetch("http://localhost:5003/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action,
        timestamp: new Date().toISOString(),
        data
      })
    });
  } catch (err) {
    console.error("Failed to log to server2:", err.message);
  }
}

module.exports = logToServer2;
