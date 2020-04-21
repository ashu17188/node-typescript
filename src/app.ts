import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PokemonController } from "./api/pokemon/pokemon.controller";
import mongoose from "mongoose";
import middleware from "./middleware";
//import routes from "./api";
import { applyMiddleware, applyRoutes } from "./utils";
import { connect } from './database';
import errorHandlers from "./middleware/errorHandlers";
import { SearchController } from "./api/search/search.controller";
import { PostController } from './api/post/post.controller';

class App {
  public app: any;
  public pokeController: PokemonController;
  public searchController:SearchController;
  public postController : PostController;
  constructor() {
    this.app = express();
    this._setConfig();
    this._setMongoConfig();
    this.pokeController = new PokemonController(this.app);
    this.searchController = new SearchController(this.app);
    this.postController = new PostController(this.app);
    applyMiddleware(middleware, this.app);
    //applyRoutes(routes, this.app);
    applyMiddleware(errorHandlers, this.app);
  }

  private _setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private _setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/admin", {
      useNewUrlParser: true,useUnifiedTopology: true
    });
  }
}

export default new App().app;

