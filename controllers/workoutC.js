const Workout = require("../models/WorkoutsM");

// Create a new Workout
exports.addWorkout = async (req, res) => {
  console.log(req.user.id);
  try {
    const rawWorkout = {
      userId: req.user.id,
      name: req.body.name,
      duration: req.body.duration,
    };

    const workout = new Workout(rawWorkout);   // ✅ lowercase instance
    const savedWorkout = await workout.save(); // ✅ save instance
    res.status(201).json(savedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all workouts
exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }); // filter by user
    res.json({ workouts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Workout
exports.updateWorkout = async (req, res) => {
  console.log(req.params, 'wrkoutC')
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout updated successfully", updatedWorkout });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Workout
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.completeWorkoutStatus = async (req, res) => {
  console.log(req.params.id, 'completeWorkoutStatus')
  try {
    const { id } = req.params;

    const rawWorkout = {
      status : "completed"
    };

    const updatedWorkout = await Workout.findByIdAndUpdate(id, rawWorkout, {
      new: true,
      runValidators: true,
    });
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout updated successfully", updatedWorkout });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
