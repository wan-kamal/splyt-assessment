import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const permissionHandler = (server: FastifyInstance, error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error.message === 'PERMISSION_DENIED') {
    reply.code(403).send({ data: 'PERMISSION_DENIED' })
    return
  }
}
