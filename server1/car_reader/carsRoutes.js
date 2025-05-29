const { eq } = require("drizzle-orm");

async function carsRoutes(fastify, options) {
  const { db, cars } = require("./db/index");

  fastify.get("/cars", async (request, reply) => {
    try {
      const result = await db.select().from(cars);
      return result;
    } catch (err) {
      console.error(err);
      reply.status(404).send({ error: "Cars not found" });
    }
  });

  fastify.get("/cars/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      const result = await db.select().from(cars).where(eq(cars.id, id));
      return result;
    } catch (err) {
      console.error(err);
      reply.status(404).send({ error: "Failed to fetch car" });
    }
  });
}

module.exports = carsRoutes;
