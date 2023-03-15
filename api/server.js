const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const postRouter = require("./posts/post-router");
const userRouter = require("./users/user-router");
const commentRouter = require("./comments/comment-router");
const authMd = require("./auth/auth-middleware");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/posts", authMd.restricted, postRouter);
server.use("/api/users", authMd.restricted, userRouter);
server.use("/api/comment", commentRouter);

module.exports = server;
