const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ models: { User } }) {
    super({ Model: User });
    this.User = User;
  }

  async findUserByEmail(email) {
    const user = await this.User.findOne({ email }).select('+password');

    return user;
  }

  async findUserById(id) {
    const user = await this.User.findById(id).populate({
      path: 'wallet',
      select: 'balance',
    });

    console.log('get logged in user', user);

    if (!user) {
      throw new Error(`User not found with id ${id}`, 404);
    }

    return user;
  }
}

module.exports = UserRepository;
