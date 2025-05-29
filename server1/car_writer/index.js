const Fastify = require("fastify");
const cors = require("@fastify/cors");
const carsRoutes = require("./carsRoutes");

const app = Fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["POST", "DELETE", "PUT"],
});

app.get("/health", () => ({ status: "car-writer up" }));

app.register(carsRoutes, { prefix: "/ms2" })

app.listen({ port: 5002 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
