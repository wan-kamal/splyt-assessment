import fastify from "fastify";
import fastifyCors from "fastify-cors";
import taxis from "./app/api/v1/taxi";
import { environment } from "./environments/environment";

const server = fastify();
server.register(fastifyCors)
server.register(taxis, { prefix: 'api/v1' })

const port = process.env.PORT || environment.port;

server.get('/', async (request, reply) => {
  reply.code(200).send({message: 'Welcome to Taxi Backend'})
})

server.listen(port, '::', (err) => {
  if (err) {
    console.error()
  } else {
    console.log(`server is running at http://localhost:${port}`)
  }
})

