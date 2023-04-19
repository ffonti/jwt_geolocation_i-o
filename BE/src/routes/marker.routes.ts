import express from "express";

const controller = require("../controllers/marker.controller");
const middleware = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.post("/", [middleware.authJwt], controller.postMarker);

module.exports = router;
