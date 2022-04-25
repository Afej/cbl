function getUser({ userRepository }) {
  return (id) => userRepository.findUserById(id);
}

module.exports = getUser;
