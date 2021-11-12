const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { exerciseService } = require('../services');

const createExercise = catchAsync(async (req, res) => {
    const exercise = await exerciseService.createExercise(req.body);
    res.status(httpStatus.CREATED).send(exercise);
});

const getExerciseList = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['lessonId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await exerciseService.queryExercise(filter, options);
    res.send(result);
});

const getExercise = catchAsync(async (req, res) => {
    const exercise = await exerciseService.getExerciseById(req.params.exerciseId);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not found');
    }
    exercise.questionList = await exerciseService.queryQuestions(exercise.questionIds);
    res.send(exercise);
});

const updateExercise = catchAsync(async (req, res) => {
    const exercise = await exerciseService.updateExerciseById(req.params.exerciseId, req.body);
    res.send(exercise);
});

const deleteExercise = catchAsync(async (req, res) => {
    await exerciseService.deleteExerciseById(req.params.exerciseId);
    res.status(httpStatus.NO_CONTENT).send();
});

const calculateExercise = catchAsync(async (req, res) => {
    const result =  exerciseService.calculateScore(req.params.exerciseId, req.body, req.user._id);
    res.send(result);
});

module.exports = {
    createExercise,
    getExerciseList,
    getExercise,
    updateExercise,
    deleteExercise,
    calculateExercise
};
