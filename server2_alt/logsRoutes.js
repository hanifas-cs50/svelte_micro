async function logsRoutes(fastify, options) {
  const { db, logs } = require("./db/index");

  fastify.get("/logs", async (request, reply) => {
    try {
      const result = await db.select().from(logs);
      return result;
    } catch (err) {
      console.error(err);
      reply.status(404).send({ error: "Logs not found" });
    }
  });

  fastify.post("/log", async (request, reply) => {
    const { source, action, data, timestamp } = request.body;

    // console.log({ source, action, data: JSON.stringify(data), timestamp: String(timestamp) });

    if (!source || !action || !data || !timestamp) {
      return reply
        .status(400)
        .send({ error: "Source, action, data, and timestamp are required." });
    }

    try {
      await db.insert(logs).values({ source, action, data: JSON.stringify(data), timestamp: String(timestamp) });
      reply.status(201).send({ message: "Log created" });
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Failed to create log" });
    }
  });
}

module.exports = logsRoutes;
