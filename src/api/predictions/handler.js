const { PythonShell } = require('python-shell');
const path = require('path');

class PredictionsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postPredictionHandler(request, h) {
    this._validator.validatePredictionPayload(request.payload);
    const { features } = request.payload;

    const options = {
      mode: 'json',
      pythonPath: 'python',
      scriptPath: path.join(__dirname, '../../../ml_model'),
      args: [JSON.stringify({ features })],
    };

    try {
      const results = await PythonShell.run('predict.py', options);
      const predictionResult = results[0];

      if (predictionResult.error) {
        throw new Error(predictionResult.error);
      }
      
      return h.response({
        status: 'success',
        message: 'Prediksi berhasil dibuat',
        data: predictionResult,
      }).code(201);
    } catch (error) {
      console.error(error);
      const response = h.response({
        status: 'fail',
        message: `Gagal melakukan prediksi: ${error.message}`,
      });
      response.code(400);
      return response;
    }
  }
}

module.exports = PredictionsHandler;