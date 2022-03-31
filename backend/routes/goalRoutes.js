const express = require("express");
const router = express.Router();

router.get("/goals", (req, res) => {
  res.status(200).send("Get Request is Successful");
});
router.post("/goals", (req, res) => {
  res.status(200).send("Set Goal");
});
router.put("/:id", (req, res) => {
  res.status(200).send(`Get Goal ${req.params.id}`);
});
router.delete("/:id", (req, res) => {
  res.status(200).send(`Delete Goal ${req.params.id}`);
});

module.exports = router;
