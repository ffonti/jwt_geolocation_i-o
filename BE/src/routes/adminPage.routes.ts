import express from "express";

const controller1 = require("../controllers/isAdmin.controller");
const controller2 = require("../controllers/view-data.controller");
const middleware = require("../middlewares/guard.middleware");

const router = express.Router();

router.get("/", [middleware.guard], controller1.isAdmin);
router.get("/users", [middleware.guard], controller2.getUsers);

module.exports = router;
