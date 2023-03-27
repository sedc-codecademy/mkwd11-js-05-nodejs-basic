import jwt from "jsonwebtoken";

export const createAccessToken = userId => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn configures how long the token will be valid
    expiresIn: "5m",
  });
};

export const verifyAccessToken = token => {
  // Verifies a token and returns the payload if success or throws an error
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const createRefreshToken = userId => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    // Refresh tokens expire after a longer period
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = refreshToken => {
  // Verifies a token and returns the payload if success or throws an error
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};
