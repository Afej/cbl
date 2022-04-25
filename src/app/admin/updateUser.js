function updateUser({ userRepository }) {
  return (id, payload) =>
    userRepository.findOneAndUpdate(
      { id },
      { ...payload },
      { new: true, runValidators: true }
    );
}

module.exports = updateUser;
