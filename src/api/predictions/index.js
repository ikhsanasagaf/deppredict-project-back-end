const PredictionsHandler = require('./handler');
const routes = require('./routes');
const PredictionsValidator = require('../../validator/predictions');

module.exports = {
  name: 'predictions',
  version: '1.0.0',
  register: async (server) => {
    const handler = new PredictionsHandler(PredictionsValidator);
    server.route(routes(handler));
  },
};