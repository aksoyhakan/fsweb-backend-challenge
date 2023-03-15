const router = require("express").Router();
const CommentModels = require("./comment-model");
const commentMd = require("./comment-middleware");

router.post("/", commentMd.checkPayloadComment, (req, res, next) => {
  CommentModels.insertComment(req.body)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ status: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
