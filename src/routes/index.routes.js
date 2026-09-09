const express = require("express");
const { getWelcome } = require("../controllers/index.controller");

const router = express.Router();

router.get("/", getWelcome);

module.exports = router;