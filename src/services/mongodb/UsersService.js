const { MongoClient } = require("mongodb");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const InvariantError = require("../../exceptions/InvariantError");
const AuthenticationError = require("../../exceptions/AuthenticationError");

class UsersService {
  constructor() {
    const client = new MongoClient(process.env.MONGO_URI);
    client.connect();
    this._collection = client.db("deppredict-db").collection("users");
  }

  async addUser({ name, email, password }) {
    await this.verifyNewEmail(email);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: id,
      name,
      email,
      password: hashedPassword,
    };

    const result = await this._collection.insertOne(newUser);
    if (!result.insertedId) {
      throw new InvariantError("Gagal menambahkan user");
    }
    return result.insertedId;
  }

  async verifyNewEmail(email) {
    const user = await this._collection.findOne({ email });
    if (user) {
      throw new InvariantError(
        "Gagal menambahkan user. Email sudah digunakan."
      );
    }
  }

  async verifyUserCredential(email, password) {
    const user = await this._collection.findOne({ email });
    if (!user) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthenticationError("Kredensial yang Anda berikan salah");
    }

    return user._id;
  }
}

module.exports = UsersService;
