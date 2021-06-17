import express, { Application, Request, Response, NextFunction } from "express";
import "dotenv/config";

import listEndPoint from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import UserRouter from "./routes/user/index";

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT;

server.use("/chanel", UserRouter);

console.log(listEndPoint(server));

mongoose.connect(
  process.env.MONGO_CONNECTION!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("Connected")
);

server.listen(port, () => {
  console.log(`The application it's running on port ${port}`);
});
