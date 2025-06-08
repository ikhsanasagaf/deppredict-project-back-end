const serverless = require('serverless-http');
const { init } = require('../server');

module.exports.handler = async (event, context) => {
  console.log("--- Netlify Function Event Received ---");
  console.log(JSON.stringify(event, null, 2));
  console.log("--- End of Event ---");

  const server = await init();
  const serverlessHandler = serverless(server.listener);
  
  return serverlessHandler(event, context);
};
