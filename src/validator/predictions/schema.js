const Joi = require('@hapi/joi');

// Skema untuk memvalidasi data yang masuk dari front-end
// Model Anda menerima 12 fitur
const PredictionPayloadSchema = Joi.object({
  features: Joi.array().items(Joi.number()).length(12).required(),
});

module.exports = { PredictionPayloadSchema };