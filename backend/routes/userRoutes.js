const express = require("express");

// DEFINE USER CONTROLLERS (APIs)
const {
  registerUser,
  authUser,
  listUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
  userFirstConnect,
  userChangepwd,
  UpdateUtilisateur,
  refreshUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

// DEFINE ROUTES WITH APIs
const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/refresh").post(refreshUser);

router.route("/profile").put(protect, updateUserProfile);
router.route("/listeutilisateurs").get(protect, listUsers);
router.route("/firstconnect").put(protect, userFirstConnect);
router.route("/changepassword").put(protect, userChangepwd);
router
  .route("/:id")
  .get(getUserById)
  .put(protect, UpdateUtilisateur)
  .delete(protect, deleteUser);

module.exports = router;
