const router = require("express").Router();
const PostModels = require("./post-model");
const postMd = require("./post-middleware");
const authMd = require("../auth/auth-middleware");

router.get("/", authMd.restricted, (req, res, next) => {
  PostModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database problem" }));
});

router.get(
  "/:id",
  authMd.restricted,
  postMd.checkIdExisting,
  (req, res, next) => {
    PostModels.getByPostId(req.params.id)
      .then((response) => res.status(200).json(response))
      .catch((err) => next({ status: 500, message: "database problem" }));
  }
);

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
