const router = require('express').Router();
const Workout = require('../models');

router.get('/workouts', async (req, res) => {
   try {
      const workoutData = await Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercises.duration' } } }]);
      res.json(workoutData);
   } catch (err) {
      res.status(500).json(err);
   }
});

router.post('/workouts', async (req, res) => {
   try {
      const newWorkout = await Workout.create({});
      res.json(newWorkout);
   } catch (err) {
      res.status(500).json(err);
   }
});

router.put('/workouts/:id', async (req, res) => {
   try {
      const newWorkout = await Workout.findByIdAndUpdate(
         req.params.id,
         {
            $push: {
               exercises: req.body,
            },
         },
         { new: true, runValidators: true }
      );
      res.json(newWorkout);
   } catch (err) {
      res.status(500).json(err);
   }
});

router.get('/workouts/range', async (req, res) => {
   try {
      const workoutData = await Workout.aggregate([{ $addFields: { totalDuration: { $sum: '$exercise.duration' } } }]);
      console.log(workoutData[0].exercises);
      res.json(workoutData);
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;
