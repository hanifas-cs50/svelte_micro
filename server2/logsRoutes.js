async function logsRoutes(fastify, options) {
  const { db, archive } = require("./db/index");

  fastify.get("/logs", async (request, reply) => {
    try {
      return await db.select().from(archive);
    } catch (err) {
      console.error(err);
      reply.status(404).send({ error: "Logs not found" });
    }
  });

  fastify.post("/log", async (request, reply) => {
    const { id, brand, model, price } = request.body;

    if (!id || !brand?.trim() || !model?.trim() || price === null) {
      return reply
        .status(400)
        .send({ error: "Brand, model, and price are required." });
    }

    try {
      await db.insert(archive).values({ cars_id: id, brand, model, price });
      reply.status(201).send({ message: "Log created" });
    } catch (err) {
      console.error("DB insert failed: ", err);
      reply.status(500).send({ error: "Failed to create log" });
    }
  });
}

module.exports = logsRoutes;
