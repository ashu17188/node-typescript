import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PokemonController } from "./api/pokemon/pokemon.controller";
import mongoose from "mongoose";
import middleware from "./middleware";
//import routes from "./api";
import { applyMiddleware, applyRoutes } from "./utils";
import errorHandlers from "./middleware/errorHandlers";
import { SearchController } from "./api/search/search.controller";
import { PostController } from './api/post/post.controller';
import compression from "compression";
import { UserController } from "./api/user/user.controller";


class App {
  public app: any;
  public searchController:SearchController;
  MONGODB_URI = 'mongodb://localhost:27017/admin';
  constructor() {
    this.app = express();
    this._setConfig();
    this.mongo();
    this.routes();
    this.searchController = new SearchController(this.app);
    applyMiddleware(middleware, this.app);
    //applyRoutes(routes, this.app);
    applyMiddleware(errorHandlers, this.app);
  }

  private _setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  public routes(): void {
    this.app.use("/api/v1/user", new UserController().router);
    this.app.use("/api/v1/mongo", new PokemonController().router);
    this.app.use("/api/v1/posts", new PostController().router);
    
  }



  // private _setMongoConfig() {
  //   mongoose.Promise = global.Promise;
  //   mongoose.connect("mongodb://localhost:27017/admin", {
  //     useNewUrlParser: true,useUnifiedTopology: true
  //   });
  // }

  private mongo() {
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
      console.log("Mongo Connection Disconnected");
      console.log("Trying to reconnect to Mongo ...");
      setTimeout(() => {
        mongoose.connect(this.MONGODB_URI, {
          autoReconnect: true, keepAlive: true,
          socketTimeoutMS: 3000, connectTimeoutMS: 3000
        });
      }, 3000);
    });
    connection.on("close", () => {
      console.log("Mongo Connection Closed");
    });
    connection.on("error", (error: Error) => {
      console.log("Mongo Connection ERROR: " + error);
    });

    const run = async () => {
      await mongoose.connect(this.MONGODB_URI, {
        autoReconnect: true, keepAlive: true
      });
    };
    run().catch(error => console.error(error));
  }


}

export default new App().app;

