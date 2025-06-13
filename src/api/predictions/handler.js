const axios = require('axios');
const InvariantError = require('../../exceptions/InvariantError');

class PredictionsHandler {
  constructor(validator) {
    this._validator = validator;
  }

  async postPredictionHandler(request, h) {
    try {
      this._validator.validatePredictionPayload(request.payload);
      const { features } = request.payload;

      // Panggil API model ML yang sudah di-deploy di Hugging Face
      const response = await axios.post(process.env.ML_API_URL, {
        features,
      });

      // Pastikan API ML merespons dengan sukses
      if (response.status !== 200 || response.data.error) {
        throw new InvariantError(response.data.error || 'Gagal mendapatkan prediksi dari model ML');
      }
      
      // Kirim kembali hasil prediksi ke front-end
      return h.response({
        status: 'success',
        message: 'Prediksi berhasil dibuat',
        data: response.data,
      }).code(201);
    } catch (error) {
      console.error(error); // Penting untuk logging di server
      // Mengembalikan response error yang lebih informatif ke client
      const response = h.response({
        status: 'fail',
        message: error.response ? error.response.data.error : `Gagal melakukan prediksi: ${error.message}`,
      });
      // Mengatur kode status berdasarkan error dari axios atau default ke 400
      response.code(error.response ? error.response.status : 400);
      return response;
    }
  }
}

module.exports = PredictionsHandler;