const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { learningService } = require('../services');

const createBlock = catchAsync(async (req, res) => {
    const block = await learningService.createBlock(req.body);
    res.status(httpStatus.CREATED).send(block);
});

const createClass = catchAsync(async (req, res) => {
    const classData = await learningService.createClass(req.body);
    res.status(httpStatus.CREATED).send(classData);
});

const createLecture = catchAsync(async (req, res) => {
    const lecture = await learningService.createLecture(req.body);
    res.status(httpStatus.CREATED).send(lecture);
});

const createLesson = catchAsync(async (req, res) => {
    const lesson = await learningService.createLesson(req.body);
    res.status(httpStatus.CREATED).send(lesson);
});

const getStudyLevels = catchAsync(async (req, res) => {
    const result = await learningService.getStudyLevels(req.user._id);
    res.send(result);
});

const updateBlock = catchAsync(async (req, res) => {
    const block = await learningService.updateBlockById(req.params.blockId, req.body);
    res.send(block);
});

const updateClass = catchAsync(async (req, res) => {
    const classData = await learningService.updateClassById(req.params.classId, req.body);
    res.send(classData);
});

const updateLecture = catchAsync(async (req, res) => {
    const lecture = await learningService.updateLectureById(req.params.lectureId, req.body);
    res.send(lecture);
});

const updateLesson = catchAsync(async (req, res) => {
    const lesson = await learningService.updateLessonById(req.params.lessonId, req.body);
    res.send(lesson);
});

const deleteBlock = catchAsync(async (req, res) => {
    await learningService.deleteBlockById(req.params.blockId);
    res.status(httpStatus.NO_CONTENT).send();
});

const deleteClass = catchAsync(async (req, res) => {
    await learningService.deleteClassById(req.params.classId);
    res.status(httpStatus.NO_CONTENT).send();
});

const deleteLecture = catchAsync(async (req, res) => {
    await learningService.deleteLectureById(req.params.lectureId);
    res.status(httpStatus.NO_CONTENT).send();
});

const deleteLesson = catchAsync(async (req, res) => {
    await learningService.deleteLessonById(req.params.lessonId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBlock,
    createClass,
    createLecture,
    createLesson,
    updateBlock,
    updateClass,
    updateLecture,
    updateLesson,
    deleteBlock,
    deleteClass,
    deleteLecture,
    deleteLesson,
    getStudyLevels
};
