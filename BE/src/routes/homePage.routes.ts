import express from "express";

const controller = require("../controllers/view-data.controller");
const middleware = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.get("/nomi", [], controller.getNomi);
router.get("/colori", [middleware.authJwt], controller.getColori);

module.exports = router;
