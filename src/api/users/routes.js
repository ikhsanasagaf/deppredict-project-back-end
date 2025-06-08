const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => handler.postLoginHandler(request, h),
  },
];

module.exports = routes;