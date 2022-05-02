function deleteUser({ userRepository }) {
  return (id) => userRepository.findOneAndDelete({ _id: id });
}

module.exports = deleteUser;
