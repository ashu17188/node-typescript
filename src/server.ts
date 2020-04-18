import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./api";
import { connect } from './database';
import {Controller} from './api/pokemon/main.controller';
import mongoose from "mongoose";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/admin", {
  useNewUrlParser: true,useUnifiedTopology: true
});

const router = express();
let pokeController = new Controller(router);
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
