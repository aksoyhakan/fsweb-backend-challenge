const router = require("express").Router();
const UserModels = require("./user-model");
const userMd = require("./user-middleware");
const authMd = require("../auth/auth-middleware");

router.get("/", authMd.restricted, (req, res, next) => {
  UserModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database problem" }));
});

router.get(
  "/:id",
  authMd.restricted,
  userMd.checkIdExisting,
  (req, res, next) => {
    UserModels.getById(req.params.id).then((response) =>
      res.status(200).json(response)
    );
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
