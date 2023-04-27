import express from "express";

const controller = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer({ dest: "./assets/uploads/" });

const router = express.Router();

router.post("/", upload.array("documents"), [], controller.uploadFile);
router.get("/getFiles", [], controller.getFiles);

module.exports = router;
