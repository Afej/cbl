const { jwt_cookie_expiry, env } = require("config");

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + jwt_cookie_expiry * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (env === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = sendTokenResponse;
