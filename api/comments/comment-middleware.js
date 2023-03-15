function checkPayloadComment(req, res, next) {
  const keyArray = ["commentNote", "userId", "postId"];
  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

module.exports = { checkPayloadComment };
