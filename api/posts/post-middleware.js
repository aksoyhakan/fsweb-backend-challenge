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

module.exports = { checkIdExisting };
