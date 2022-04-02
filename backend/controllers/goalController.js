const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");
//@desc Get goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});
//@desc Post goals
//@route Post /api/goals
//@access Private
const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please submit some data");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
//@desc patch goals
//@route Get /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not Found");
  }

  const user = await User.findById(req.user.id);

  //Check For user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user Matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authrorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});
//@desc delete goal
//@route delete /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndRemove(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Can't Find Goal");
  }

  const user = await User.findById(req.user.id);

  //Check For user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user Matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authrorized");
  }

  res.status(200).json({ message: `Deleted goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoals,
  deleteGoals,
};
