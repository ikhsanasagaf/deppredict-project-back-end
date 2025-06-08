const serverless = require('serverless-http');
const { init } = require('./server'); // karena fungsi init ada di server.js

let cachedHandler;

module.exports.handler = async (event, context) => {
  if (!cachedHandler) {
    const server = await init();
    cachedHandler = serverless(server.listener);
  }

  return cachedHandler(event, context);
};