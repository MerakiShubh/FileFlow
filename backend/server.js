import dotenv from "dotenv";
import connectDB from "./db/index.js";
import router from "./routes/files.js";
import router1 from "./routes/show.js";
import { app } from "./app.js";
import path from "path";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is runnig at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed!!", err);
  });

// <---------------------------Templeting Engine Trial ----------------------------------->

// app.set("views", path.join(__dirname, "/views"));
// app.set("views", "ejs");
// const viewsPath = path.join(import.meta.url, "/views");
// app.set("views", viewsPath);
// app.set("view engine", "ejs");
// const viewsPath = path.join(new URL(".", import.meta.url).pathname, "/views");
// app.set("views", viewsPath);

//Template Engine

app.set("views", "./views");
app.set("view engine", "ejs");
//Routes

app.use("/api/files", router);
app.use("/files", router1);
