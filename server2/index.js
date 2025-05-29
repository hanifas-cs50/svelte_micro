const Fastify = require("fastify");
const cors = require("@fastify/cors");
const logsRoutes = require("./logsRoutes");

const app = Fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
});

app.get("/health", () => ({ status: "logger up" }));

app.register(logsRoutes, { prefix: "/ms3" });

app.listen({ port: 5003 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
