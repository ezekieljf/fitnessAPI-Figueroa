const express = require('express');
const workoutController = require('../controllers/workout');
const { verify } = require("../auth");

const router = express.Router();

router.post("/addWorkout", verify, workoutController.addWorkout);

router.get("/getMyWorkouts", verify, workoutController.getWorkouts);

router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout);

router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout);

router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkout);

module.exports = router;