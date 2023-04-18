import express from "express";

const controller = require("../controllers/isAdmin.controller");
const middleware = require("../middlewares/guard.middleware");

const router = express.Router();

router.get("/", [middleware.guard], controller.isAdmin);

module.exports = router;
