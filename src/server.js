require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const ClientError = require('./exceptions/ClientError');

// Impor plugin dan service
const users = require('./api/users');
const UsersService = require('./services/mongodb/UsersService');
const UsersValidator = require('./validator/users');
const TokenManager = require('./tokenize/TokenManager');

// Impor plugin baru untuk prediksi
const predictions = require('./api/predictions');

const init = async () => {
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT || 9001,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // Definisikan strategi autentikasi JWT agar rute /predict bisa diproteksi
  server.auth.strategy('jwt_auth_strategy', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 86400, // Token berlaku 24 jam
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // Daftarkan semua plugin Anda
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
        tokenManager: TokenManager,
      },
    },
    {
      plugin: predictions,
      // Tidak perlu options untuk saat ini karena handler tidak butuh service
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      if (!response.isServer) {
        return h.continue;
      }
      console.error(response);
      const newResponse = h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami.',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.initialize();
  return server;
};

module.exports = { init };