require("dotenv").config();
const path = require("path"); // <-- 1. Impor modul 'path' dari Node.js

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");

const ClientError = require("./exceptions/ClientError");
const users = require("./api/users");
const UsersService = require("./services/mongodb/UsersService");
const UsersValidator = require("./validator/users");
const TokenManager = require("./tokenize/TokenManager");

const init = async () => {
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT || 9001,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // --- Konfigurasi Swagger dengan Path Template Eksplisit ---
  const swaggerOptions = {
    info: {
      title: "DepPredict API Documentation",
      version: "1.0.0",
    },
    documentationPath: "/documentation",
    // 2. Tambahkan baris ini untuk menunjuk ke lokasi template yang benar
    templates: path.join(__dirname, "../node_modules/hapi-swagger/templates"),
  };

  await server.register([
    { plugin: Jwt },
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
        tokenManager: TokenManager,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
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
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
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
