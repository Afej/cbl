function createUser({ userRepository, walletRepository }) {
  return async (payload) => {
    const user = await userRepository.createDoc({...payload});

    await walletRepository.createDoc({ user_id: user.id });
    
    return {
      user,
    };
  };
}

module.exports = createUser;
