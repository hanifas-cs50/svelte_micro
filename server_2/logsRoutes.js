async function logsRoutes(fastify, options) {
  const { db, cars } = require("./db/index");

  fastify.get("/logs", async (request, reply) => {
    try {
      const result = await db.select().from(cars);
      return result;
    } catch (err) {
      console.error(err);
      reply.status(404).send({ error: "Cars not found" });
    }
  });

  fastify.post("/logs", async (request, reply) => {
    const { brand, model, price } = request.body;

    if (!brand || !model || price === undefined) {
      return reply
        .status(400)
        .send({ error: "Brand, model, and price are required." });
    }

    try {
      await db.insert(cars).values({ brand, model, price });
      reply.status(201).send({ message: "Car created" });
    } catch (err) {
      reply.status(500).send({ error: "Failed to create car" });
    }
  });
}

module.exports = logsRoutes;
