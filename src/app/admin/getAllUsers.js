function getAllUsers({ userRepository }) {
  return () => userRepository.find({}, {}, {}, true);
}

module.exports = getAllUsers;
