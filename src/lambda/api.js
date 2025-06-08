const serverless = require('serverless-http');
const { init } = require('../server');

let cachedServer;

module.exports.handler = async (event, context) => {
  if (!cachedServer) {
    const server = await init();
    cachedServer = serverless(server.listener);
  }

  return cachedServer(event, context);
};
