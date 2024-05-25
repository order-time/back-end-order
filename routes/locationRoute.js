const express = require("express");
const upload = require("../middleware/fileUpload");

const {
  create,
  update,
  detail,
  findDelete,
  getAll,
} = require("../controller/locationController");
const router = express.Router();
const { getCategorySortItem } = require("../controller/serviceController");
const { protect } = require("../middleware/protect");

router.route("/").post(protect, create).get(getAll);

router.route("/:id").put(protect, update).delete(findDelete).get(detail);

// router.route("/:category_id/item").get(getCategorySortItem);

module.exports = router;
