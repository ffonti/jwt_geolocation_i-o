import express from "express";
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/", [], controller.register);

module.exports = router;
