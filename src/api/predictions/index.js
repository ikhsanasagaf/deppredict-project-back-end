const PredictionsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'predictions',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const handler = new PredictionsHandler(service, validator);
    server.route(routes(handler));
  },
};