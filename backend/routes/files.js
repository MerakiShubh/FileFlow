import { Router } from "express";
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { File } from "../models/file.model.js";
import sendMail from "../services/emailService.js";
import emailTemplate from "../services/emailTemplate.js";
import multer from "multer";
import { log } from "console";
const router = Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    // const uniqueName = nanoid() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 100000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  //store files
  upload(req, res, async (err) => {
    //validate request
    if (!req.file) {
      return res.json({ error: "All fields are required" });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //store into database
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();

    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
    //http://localhost:3000/files/235884-3hsdfh
  });
});

//Email Features

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  // console.log(req.body);
  // res.send({});
  //validate request
  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: "All fields are required" });
  }
  //Get data from database
  const file = await File.findOne({ uuid: uuid });
  if (file.sender) {
    return res.status(422).send({ error: "Email already sent" });
  }
  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  //send email
  sendMail({
    to: emailTo,
    from: emailFrom,
    subject: `${emailTo} shared a file with you`,
    html: emailTemplate({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 Hours",
    }),
  });
  return res.send({ success: true });
});

export default router;
