const { UserPayloadSchema, UserLoginPayloadSchema } = require('../../validator/users/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
    options: {
      tags: ['api', 'users'],
      description: 'Mendaftarkan user baru',
      notes: 'Endpoint untuk membuat akun pengguna baru',
      validate: {
        payload: UserPayloadSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => handler.postLoginHandler(request, h),
    options: {
      tags: ['api', 'users'],
      description: 'Login untuk mendapatkan token',
      notes: 'Endpoint untuk otentikasi pengguna dan mendapatkan JWT',
      validate: {
        payload: UserLoginPayloadSchema,
      },
    },
  },
];

module.exports = routes;