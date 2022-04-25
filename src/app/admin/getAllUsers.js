function getAllUsers({ userRepository }) {
  return () => userRepository.find();
}

module.exports = getAllUsers;
