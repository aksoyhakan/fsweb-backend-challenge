const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const postRouter = require("./posts/post-router");
const userRouter = require("./users/user-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

module.exports = server;
