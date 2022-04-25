const login = ({ userRepository }) => {
  return async ({email, password}) => {
    // console.log({ email, password });
    // Validate email & password
    if (!email || !password) {
      throw new Error('Please provide an email and password', 400);
    }

    // Check for user
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error('Invalid credentials', 401);
    }

    // check if user account is active or disabled
    if (user.account_status !== 'active') {
      throw new Error('Account is disabled, contact an Admin.', 401);
    }

    // Create token
    const token = user.getSignedJwtToken();

    return {
      token,
      user,
    };
  };
};

module.exports = login;
