function updateUser({ userRepository }) {
  return (id, payload) =>
    userRepository.findOneAndUpdate(
      { _id: id },
      { ...payload },
      { new: true, runValidators: true }
    );
}

module.exports = updateUser;
