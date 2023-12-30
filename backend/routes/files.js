import { Router } from "express";

const router = Router();

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
