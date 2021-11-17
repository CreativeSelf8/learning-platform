const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBlock = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        order: Joi.number().required()
    }),
};

const createClass = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        order: Joi.number().required(),
        blockId: Joi.string().custom(objectId).required(),
    }),
};

const createLecture = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        thumbnail: Joi.string().required(),
        order: Joi.number().required(),
        classId: Joi.string().custom(objectId).required(),
    }),
};

const createLesson = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        order: Joi.number().required(),
        lectureId: Joi.string().custom(objectId).required(),
    }),
};

const updateBlock = {
    params: Joi.object().keys({
        newsId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            order: Joi.number().required()
        })
        .min(1),
};

const updateClass = {
    params: Joi.object().keys({
        newsId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            order: Joi.number().required(),
            blockId: Joi.string().custom(objectId).required(),
        })
        .min(1),
};

const updateLecture = {
    params: Joi.object().keys({
        newsId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            thumbnail: Joi.string().required(),
            order: Joi.number().required(),
            classId: Joi.string().custom(objectId).required(),
        })
        .min(1),
};

const updateLesson = {
    params: Joi.object().keys({
        newsId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string().required(),
            order: Joi.number().required(),
            url: Joi.string().required(),
            description: Joi.string().required()
        })
        .min(1),
};

const deleteBlock = {
    params: Joi.object().keys({
        blockId: Joi.string().custom(objectId),
    }),
};

const deleteClass = {
    params: Joi.object().keys({
        classId: Joi.string().custom(objectId),
    }),
};

const deleteLecture = {
    params: Joi.object().keys({
        lectureId: Joi.string().custom(objectId),
    }),
};

const deleteLesson = {
    params: Joi.object().keys({
        lessonId: Joi.string().custom(objectId),
    }),
};

const getLessonList = {
    params: Joi.object().keys({
        lectureId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    getLessonList,
    deleteBlock,
    deleteClass,
    deleteLecture,
    deleteLesson,
    updateBlock,
    updateClass,
    updateLecture,
    updateLesson,
    createBlock,
    createClass,
    createLecture,
    createLesson
};
