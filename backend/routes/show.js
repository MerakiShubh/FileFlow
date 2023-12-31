import { Router } from "express";
import { File } from "../models/file.model.js";

const router1 = Router();

router1.get("/:uuid", async (req, res) => {
  try {
    const fileFetch = await File.findOne({
      uuid: req.params.uuid,
    });
    if (!fileFetch) {
      return res.render("download", { error: "Link has been expired!!!" });
    }

    return res.render("download", {
      uuid: fileFetch.uuid,
      fileName: fileFetch.filename,
      fileSize: fileFetch.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${fileFetch.uuid}`,
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong!!!" });
  }
});

export default router1;
