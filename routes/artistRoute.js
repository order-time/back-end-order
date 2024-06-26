const express = require("express");
const upload = require("../middleware/fileUpload");

const { protect, authorize } = require("../middleware/protect");
const {
  createUser,
  Login,
  getAllUser,
  updateUser,
  deleteUser,
  userDetail,
} = require("../controller/artistController");
const router = express.Router();
const { myUserServiceAll } = require("../controller/serviceController");

//"/api/v1/user"
// protect, authorize("admin"),  nemeh

router
  .route("/")
  .get(getAllUser)
  .post(protect, upload.single("file"), createUser);
router
  .route("/:id")
  .put(upload.single("file"), protect, updateUser) // authorize("admin"), hassan
  .delete(upload.single("file"), protect, deleteUser)
  .get(userDetail); // authorize("admin"), hassan
router.route("/getUserService/service").get(protect, myUserServiceAll);
router.route("/login").post(Login);
module.exports = router;
