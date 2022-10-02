import express from "express";
import db from "mongoose";
import userroute from "./routes/userroute.js";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

class App {
  constructor() {
    this.__dirname = path.resolve();
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(
      "/images",
      express.static(path.join(this.__dirname, "images"))
    );
    this.app.use(userroute);
    dotenv.config({ path: ".env" });
    this.app.set("port", process.env.PORT || 8000);

    this.connectDb();
    this.startServer();
  }

  connectDb = () => {
    db.connect(process.env.MONGOCONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(function (res) {
        console.log("Database Connected");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  startServer = () => {
    this.httpServer.listen(this.app.get("port"), () =>
      console.log(`listening on port ${this.app.get("port")}`)
    );
  };
}

new App();
