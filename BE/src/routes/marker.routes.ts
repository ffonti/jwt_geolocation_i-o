import express from "express";

const controller = require("../controllers/marker.controller");
const middleware = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.post("/", [middleware.authJwt], controller.postMarker);
router.get("/:id", [], controller.getMarkers);
router.post("/inLayer", [], controller.markersInLayer);

module.exports = router;
