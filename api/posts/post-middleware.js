const PostModels = require("./post-model");

function checkIdExisting(req, res, next) {
  PostModels.getByPostId(req.params.id).then((response) => {
    response
      ? next()
      : next({
          status: 404,
          message: `ID No: ${req.params.id} posts not found`,
        });
  });
}

function checkPayloadPost(req, res, next) {
  const keyArray = ["postPhoto", "postNote", "userId"];
  keyArray.forEach((key) => {
    !req.body[key] &&
      next({ status: 404, message: `${key} property is missing` });
  });
  next();
}

module.exports = { checkIdExisting, checkPayloadPost };
