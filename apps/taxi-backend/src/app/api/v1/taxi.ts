import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { SplytApiResponse } from '@data-access';
import axios from 'axios';
import { ITaxi } from "../../models";
import { permissionService } from "../../common/endpoint.service";
import { permissionHandler } from "../../common/endpoint.handler"

const taxis: FastifyPluginAsync = async (server: FastifyInstance) => {

  server.get<{Params: ITaxi}>('/taxis/:latitude/:longitude/:count', {
    errorHandler: (error, request, reply) => {
      permissionHandler(server, error, request, reply);
      server.errorHandler(error, request, reply);
    }}, async (request, reply) => {
      permissionService(request.headers.authorization);
      await axios.get<SplytApiResponse>('https://qa-interview-test.splytech.dev/api/drivers',
      {params: {latitude: request.params.latitude, longitude: request.params.longitude, count: request.params.count }}).then(resolve => {
        reply.code(200).send(resolve.data);
      }).catch(err => {
        console.error(err);
        reply.code(417).send(err)
      })
    }
  );
};

export default taxis
