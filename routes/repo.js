const express = require("express");
const { getRepo, getTags } = require("../controller/repo_controller");
const router = express.Router();

router.route("/repos").get(getRepo);
router.route("/tags").get(getTags);

module.exports = router;
