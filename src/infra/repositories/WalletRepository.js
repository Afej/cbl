const BaseRepository = require('./BaseRepository');

class WalletRepository extends BaseRepository {
  constructor({ models: { Wallet } }) {
    super({ Model: Wallet });
  }
}

module.exports = WalletRepository;
