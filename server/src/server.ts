import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { pangolinRouter } from "./pangolin.routes";
 
dotenv.config();
 
const { uri } = process.env;
 
if (!uri) {
   console.error("No uri in config.env");
   process.exit(1);
}
 
connectToDatabase(uri)
   .then(() => {
       const app = express();
       app.use(cors());
       app.use("/pangolins", pangolinRouter);
       app.listen(5200, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
 
   })
   .catch(error => console.error(error));