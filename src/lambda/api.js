const serverless = require('serverless-http');
const { init } = require('../server');

let cachedServer;

module.exports.handler = async (event, context) => {
  console.log("--- Netlify Function Event Received ---");
  console.log(JSON.stringify(event, null, 2));
  console.log("--- End of Event ---");

  const basePath = '/.netlify/functions/api';
  if (event.path.startsWith(basePath)) {
    event.path = event.path.substring(basePath.length);
  }

  if (!cachedServer) {
    const server = await init();
    cachedServer = serverless(server.listener);
  }
  
  return cachedServer(event, context);
};
