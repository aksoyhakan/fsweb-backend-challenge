const UserModels = require("./user-model");

function checkIdExisting(req, res, next) {
  UserModels.getById(req.params.id)
    .then((response) => {
      response
        ? res.status(200).json(response)
        : next({
            status: 404,
            message: `Id No: ${req.params.id}  user is not found`,
          });
    })
    .catch((err) => next({ status: 500, message: "database problem" }));
}

module.exports = { checkIdExisting };
