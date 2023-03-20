export const loggerMiddleware = (req, res, next) => {
  console.log("this is from the logger middlware");

  res.sendStatus(403);

  // next();
};
