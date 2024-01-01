import { Router } from "express";
import { File } from "../models/file.model.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router2 = Router();

router2.get("/:uuid", async (req, res) => {
  const file = await File.findOne({
    uuid: req.params.uuid,
  });
  if (!file) {
    return res.render("download", { error: "Link has been expired" });
  }
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = dirname(currentFilePath);

  const filePath = `${currentDirPath}/../${file.path}`;
  res.download(filePath);
});

export default router2;
