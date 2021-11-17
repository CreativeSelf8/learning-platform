const httpStatus = require('http-status');
const { QuestionExam, Exercise, ExerciseHistory, Lesson } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a exercise
 * @param {Object} exerciseBody
 * @returns {Promise<Exercise>}
 */
const createExercise = async (exerciseBody) => {
    let lessonId = exerciseBody.lessonId;
    let lesson = Lesson.findById(lessonId);
    if (!lesson) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lesson not found');
    }
    exerciseBody.questionIds = await createQuestionExam(exerciseBody.questions);
    return Exercise.create(exerciseBody);
};

const createQuestionExam = async (questionArray) => {
    let questionIds = [];

    for(let element of questionArray) {
        let question = await QuestionExam.create(element);
        questionIds.push(question._id);
    }
    return questionIds;
};

/**
 * Query for exercise
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryExercise = async (filter, options) => {
    const exerciseData = await Exercise.paginate(filter, options);
    let questionIds = [];
    for (let element of exerciseData.results) {
        for (let questionId of element.questionIds) {
            questionIds.push(questionId);
        }
        
    }
    const questionArray = await queryQuestions(questionIds);
    let result = {};
    Object.assign(result, exerciseData);
    result.results.map(function (element) {
        element.questionList = questionArray.filter(e => element.questionIds.includes(e._id.toString()));
        console.log(element);
        return element;
    })
    console.log(result);

    return result;
};

/**
 * Query for questions
 * @param {array} questionIds
 * @returns {Promise<QueryResult>}
 */
 const queryQuestions = async (questionIds) => {
    const questionList = await QuestionExam.find({_id : {$in : questionIds}});
    return questionList;
};

/**
 * Get exercise by id
 * @param {ObjectId} id
 * @returns {Promise<Exercise>}
 */
const getExerciseById = async (id) => {
    return Exercise.findById(id);
};

/**
 * Update Exercise by id
 * @param {ObjectId} exerciseId
 * @param {Object} updateBody
 * @returns {Promise<News>}
 */
const updateExerciseById = async (exerciseId, updateBody) => {
    const exercise = await getNewsById(exerciseId);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not found');
    }
    await QuestionExam.deleteMany({_id : exercise.questionIds});
    updateBody.questionIds = await createQuestionExam(updateBody.questions);

    Object.assign(exercise, updateBody);
    await exercise.save();
    return exercise;
};

/**
 * Delete news by id
 * @param {ObjectId} exerciseId
 * @returns {Promise<Exercise>}
 */
const deleteExerciseById = async (exerciseId) => {
    const exercise = await getExerciseById(exerciseId);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not found');
    }
    await exercise.remove();
    return exercise;
};

/**
 * Calculate exercise's score
 * @param {ObjectId} exerciseId
 * @param {Object} answerBody
 * @returns {Promise<Exercise>}
 */
 const calculateScore = async (exerciseId, answerBody, userId) => {
    const exercise = await getExerciseById(exerciseId);
    if (!exercise) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exercise not found');
    }
    let totalScore = exercise.questionIds.length;
    let questionArray = await QuestionExam.find({_id : {$in : exercise.questionIds}});
    let score = 0;
    let questionMap = Object.fromEntries(
        questionArray.map(e => [e._id, e])
    );

    answerBody.forEach(element => {
        let question = questionMap.get(element.questionId);
        if (question.answer === element.answer) {
            score++;
        }
    });
    let exerciseHistory = {
        exercise : exercise._id,
        user: userId,
        score: score
    }
    await ExerciseHistory.create(exerciseHistory);

    return {
        exerciseId : exerciseId,
        score: score,
        totalScore: totalScore
    };
};

module.exports = {
    createExercise,
    queryExercise,
    getExerciseById,
    updateExerciseById,
    deleteExerciseById,
    calculateScore,
    queryQuestions
};
