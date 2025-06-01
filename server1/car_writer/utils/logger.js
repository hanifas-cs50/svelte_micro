const fetch = require("node-fetch");

async function logToServer2({ id, brand, model, price }) {
  try {
    await fetch("http://localhost:5003/ms3/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, brand, model, price })
    });
  } catch (err) {
    console.error(`Failed to log to server2: ${err.message}`);
    throw new Error(`Failed to log to server2: ${err.message}`);
  }
}

module.exports = logToServer2;
