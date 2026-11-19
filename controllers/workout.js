const Workout = require('../models/Workout');
const {errorHandler} = require('../auth');

module.exports.addWorkout = (req, res) => {
    let newWorkout = new Workout({
        name: req.body.name,
        duration: req.body.duration,
        userId: req.user.id
    });

    return Workout.findOne({name: req.body.name, userId: req.user.id})
    .then(existingWorkout => {
        if (existingWorkout) {
            return res.status(409).send({message: 'Workout already exists'})
        } else {
            return newWorkout.save()
            .then(result => res.status(201).send(result))
            .catch(error => errorHandler(error, req, res));
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.getWorkouts = (req, res) => {
    return Workout.find({userId: req.user.id})
    .then(result => {
        if (result.length > 0) {
            return res.status(200).send({workouts: result})
        } else {
            return res.status(200).send({message: 'No Workouts'})
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.deleteWorkout = (req, res) => {
    return Workout.deleteOne({userId: req.user.id, _id: req.params.workoutId})
    .then(result => {
        console.log(result)
        if(result.deletedCount > 0) return res.status(200).send({message:'Workout deleted successfully'});
        else return res.status(404).send({message: 'Workout not found'});
    }).catch(error => errorHandler(error, req, res));
}

module.exports.updateWorkout = (req, res) => {
    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration
    }
    return Workout.findOneAndUpdate({userId: req.user.id, _id: req.params.workoutId}, updatedWorkout, { returnDocument: 'after' })
    .then(result => {
        if (result) {
            res.status(200).send({message: 'Workout updated successfully', updatedWorkout: result});
        } else {
            res.status(404).send({message: 'Workout not found'})
        }
    }).catch(error => errorHandler(error, req, res));
}

module.exports.completeWorkout = (req, res) => {
    return Workout.findOneAndUpdate({userId: req.user.id, _id: req.params.workoutId}, {status: 'complete'}, { returnDocument: 'after' })
    .then(result => {
        if (result) {
            res.status(200).send({message: 'Workout status updated successfully', updatedWorkout: result});
        } else {
            res.status(404).send({message: 'Workout not found'})
        }
    }).catch(error => errorHandler(error, req, res));
}