function getLoggedInUser({ userRepository, currentUser }) {
  return () => userRepository.findUserById(currentUser.id);
}

module.exports = getLoggedInUser;
