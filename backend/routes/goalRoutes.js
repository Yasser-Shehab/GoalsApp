const express = require("express");
const router = express.Router();
const { getGoals, postGoals, updateGoals, deleteGoals } = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, postGoals);
router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
