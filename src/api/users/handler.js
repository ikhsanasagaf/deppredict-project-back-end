const ClientError = require("../../exceptions/ClientError");

class UsersHandler {
  constructor(service, validator, tokenManager) {
    this._service = service;
    this._validator = validator;
    this._tokenManager = tokenManager;
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const { name, email, password } = request.payload;
      const userId = await this._service.addUser({ name, email, password });

      const response = h.response({
        status: "success",
        message: "User berhasil ditambahkan",
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        return error;
      }
      console.error(error);
      return error; // Hapi akan menangani sebagai server error
    }
  }

  async postLoginHandler(request, h) {
    try {
      this._validator.validateUserLoginPayload(request.payload);
      const { email, password } = request.payload;
      const id = await this._service.verifyUserCredential(email, password);

      const accessToken = this._tokenManager.generateAccessToken({ id });

      return {
        status: "success",
        message: "Login berhasil",
        data: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return error;
      }
      console.error(error);
      return error;
    }
  }
}

module.exports = UsersHandler;
