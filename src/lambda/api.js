const serverless = require('serverless-http');
const { init } = require('../server');

module.exports.handler = async (event, context) => {
  const app = await init();
  const handler = serverless(app.listener);
  return await handler(event, context);
};