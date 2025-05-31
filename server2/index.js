const Fastify = require("fastify");
const cors = require("@fastify/cors");
const logsRoutes = require("./logsRoutes");

const app = Fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET"],
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

// "http://localhost:5002", CORS does not block server to server communication
// So request like postman, curl, or another server like port 5002 over here are not blocked
// Because of that I'm changing my logging method, rather than archival of the cars
// I'm going to log where the request is from and what did it do (POST, GET, PUT, DELETE)

// There is another method, which is passworded / tokened requests
// I'm still going to do logging, but IF this was a real world project
// I would do tokened requests (that's more work tho :v)