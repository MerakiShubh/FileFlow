import dotenv from "dotenv";
import connectDB from "./db/index.js";
import router from "./routes/files.js";
import router1 from "./routes/show.js";
import router2 from "./routes/download.js";
import express from "express";
import { app } from "./app.js";
import path from "path";

dotenv.config({
  path: "./env",
});

app.use(express.static("public"));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is runnig at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed!!", err);
  });

//Template Engine

app.set("views", "./views");
app.set("view engine", "ejs");
//Routes

app.use("/api/files", router);
app.use("/files", router1);
app.use("/files/download", router2);
