const express = require("express");
const {
  CreateProjectLabo,
  CreateProjectUssq,
} = require("../controllers/projectControllers");
const router = express.Router();
//const { protect } = require("../middlewares/authMiddleware");

router.route("/creerprojetLabo").post(CreateProjectLabo);
router.route("/creerprojetQt").post(CreateProjectUssq);

module.exports = router;
