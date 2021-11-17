const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createExercise = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        lessonId: Joi.string().required(),
        order: Joi.number(),
        questions: Joi.array().items(Joi.object().keys({
            title: Joi.string().required(),
            answer: Joi.string().required(),
            multiChoices: Joi.required(),
            order: Joi.required(),
            description: Joi.string()
        }))
    }),
};

const getExerciseList = {
    query: Joi.object().keys({
        lessonId: Joi.string().custom(objectId).required(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getExercise = {
    params: Joi.object().keys({
        exerciseId: Joi.string().custom(objectId),
    }),
};

const updateExercise = {
    params: Joi.object().keys({
        exerciseId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            lessonId: Joi.string().required(),
            questions: Joi.array().items(Joi.object().keys({
                title: Joi.string().required(),
                answer: Joi.string().required(),
                multiChoices: Joi.required(),
                order: Joi.required(),
            }))
        })
        .min(1),
};

const deleteExercise = {
    params: Joi.object().keys({
        newsId: Joi.string().custom(objectId),
    }),
};

const calculateExercise = {
    params: Joi.object().keys({
        exerciseId: Joi.required().custom(objectId),
    }),
    body: Joi.array().items(Joi.object().keys({
        questionId: Joi.required().custom(objectId),
        answer: Joi.string().required(),
    })
    )
};

module.exports = {
    createExercise,
    getExerciseList,
    getExercise,
    updateExercise,
    deleteExercise,
    calculateExercise
};
