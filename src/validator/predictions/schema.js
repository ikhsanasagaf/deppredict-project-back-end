const Joi = require("@hapi/joi");

const PredictionPayloadSchema = Joi.object({
  features: Joi.array().items(Joi.number()).length(17).required(),
});

module.exports = { PredictionPayloadSchema };
