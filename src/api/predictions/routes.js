const { PredictionPayloadSchema } = require('../../validator/predictions/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/predict',
    handler: (request, h) => handler.postPredictionHandler(request, h),
    options: {
      auth: 'jwt_auth_strategy',
      tags: ['api', 'predictions'],
      description: 'Membuat prediksi status depresi',
      validate: {
        payload: PredictionPayloadSchema,
      },
    },
  },
];

module.exports = routes;