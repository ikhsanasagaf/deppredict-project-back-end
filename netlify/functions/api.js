const serverless = require('serverless-http');
const { init } = require('../../src/server'); 

module.exports.handler = async (event, context) => {
  const app = await init();
  const handler = serverless(app);
  return await handler(event, context);
};