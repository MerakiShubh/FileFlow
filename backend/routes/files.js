import { Router } from "express";
import { nanoid } from "nanoid";
import path from "path";

import multer from "multer";
const router = Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cg(null, "../uploads");
  },
  filename: (req, file, cb) => {
    // const uniqueName = `${Date.now()} + "-" + ${Math.round(
    //   Math.random() * 1e9
    // )}${path.extname(file.originalname)}`;
    const uniqueName = nanoid() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 100000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  //validate request

  if (!req.file) {
    return res.json({ error: "All fields are required" });
  }

  //store files

  //store into database

  //Response -> link
});

export default router;
