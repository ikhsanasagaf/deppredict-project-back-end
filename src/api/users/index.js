module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator, tokenManager }) => {
    const UsersHandler = require('./handler');
    const routes = require('./routes');

    const handler = new UsersHandler(service, validator, tokenManager);
    server.route(routes(handler));
  },
};