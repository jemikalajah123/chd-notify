export default (error, req, res, next) => {
  let status = res.status;
  if (status < 400) status = 400;

  res.status(status).json({
    error,
  });
};
