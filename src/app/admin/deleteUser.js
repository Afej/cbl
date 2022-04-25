function deleteUser({ userRepository }) {
  return (id) => userRepository.findOneAndDelete({id});
}

module.exports = deleteUser;
