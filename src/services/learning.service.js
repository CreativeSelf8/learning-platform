const httpStatus = require('http-status');
const { Class, Block, Lesson, Lecture, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { roles } = require('../config/roles');

/**
 * Create a class
 * @param {Object} classBody
 * @returns {Promise<Class>}
 */
const createClass = async (classBody) => {
    return Class.create(classBody);
};

/**
 * Create a school block
 * @param {Object} blockBody
 * @returns {Promise<Block>}
 */
const createBlock = async (blockBody) => {
    return Block.create(blockBody);
};

/**
 * Create a lecture
 * @param {Object} lectureBody
 * @returns {Promise<Lecture>}
 */
const createLecture = async (lectureBody) => {
    return Lecture.create(lectureBody);
};

/**
 * Create a lesson
 * @param {Object} lessonBody
 * @returns {Promise<Lesson>}
 */
const createLesson = async (lessonBody) => {
    return Lesson.create(lessonBody);
};

/**
 * Query for blocks
 * @returns {Promise<QueryResult>}
 */
const queryBlock = async () => {
    const blockData = await Block.find().sort({ order: "ascending" });
    return blockData;
};

/**
 * Query for classes
 * @returns {Promise<QueryResult>}
 */
const queryClass = async (blockId) => {
    const classData = await Class.find({ blockId: blockId }).sort({ order: "ascending" });
    return classData;
};

/**
 * Query for classes
 * @returns {Promise<QueryResult>}
 */
const queryClassList = async (blockIds) => {
    const classData = await Class.find({ blockId: { $in: blockIds } });
    return classData;
};

/**
 * Query for lectures
 * @returns {Promise<QueryResult>}
 */
const queryLecture = async (classId, userId) => {
    const user = User.findById(userId);
    const classData = Class.findById(classId);
    if (classData.age > user.age && !user.role.includes(roles.admin)) {
        return null;
    }
    const lectureData = await Lecture.find({ classId: classId }).sort({ order: "ascending" });
    return lectureData;
};

/**
 * Query for lectures
 * @returns {Promise<QueryResult>}
 */
const queryLectureList = async (classIds) => {
    const lectureData = await Lecture.find({ classId: { $in: classIds } });
    return lectureData;
};


/**
 * Query for lectures
 * @returns {Promise<QueryResult>}
 */
const queryLesson = async (lectureId, userId) => {
    const lecture = Lecture.findById(lectureId);
    const classData = Class.findById(lecture.classId);
    const user = User.findById(userId);
    if (classData.age > user.age && !user.role.includes(roles.admin)) {
        return null;
    }
    const lessonData = await Lesson.find({ classId: lecture }).sort({ order: "ascending" });
    return lessonData;
};

/**
 * Update Block by id
 * @param {ObjectId} blockId
 * @param {Object} updateBody
 * @returns {Promise<Block>}
 */
const updateBlockById = async (blockId, updateBody) => {
    const block = await Block.findById(blockId);
    if (!block) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Block not found');
    }
    Object.assign(block, updateBody);
    await block.save();
    return block;
};


/**
 * Update Class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Class>}
 */
const updateClassById = async (classId, updateBody) => {
    const classData = await Class.findById(classId);
    if (!classData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
    }
    Object.assign(classData, updateBody);
    await classData.save();
    return classData;
};

/**
 * Update Lecture by id
 * @param {ObjectId} lectureId
 * @param {Object} updateBody
 * @returns {Promise<Lecture>}
 */
const updateLectureById = async (lectureId, updateBody) => {
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    Object.assign(lecture, updateBody);
    await lecture.save();
    return lecture;
};

/**
 * Update Lesson by id
 * @param {ObjectId} lessonId
 * @param {Object} updateBody
 * @returns {Promise<Lesson>}
 */
const updateLessonById = async (lessonId, updateBody) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lesson not found');
    }
    Object.assign(lesson, updateBody);
    await lesson.save();
    return lesson;
};


/**
 * Delete block by id
 * @param {ObjectId} blockId
 * @returns {Promise<Block>}
 */
const deleteBlockById = async (blockId) => {
    const block = await Block.findById(blockId);
    if (!block) {
        throw new ApiError(httpStatus.NOT_FOUND, 'block not found');
    }
    await block.remove();
    return block;
};

/**
 * Delete Class by id
 * @param {ObjectId} classId
 * @returns {Promise<Class>}
 */
const deleteClassById = async (classId) => {
    const classData = await Class.findById(classId);
    if (!classData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
    }
    await classData.remove();
    return classData;
};

/**
 * Delete Lecture by id
 * @param {ObjectId} lectureId
 * @returns {Promise<Lecture>}
 */
const deleteLectureById = async (lectureId) => {
    const lecture = await Lecture.findById(lectureId);
    if (!classData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lecture not found');
    }
    await lecture.remove();
    return lecture;
};

/**
 * Delete Lesson by id
 * @param {ObjectId} lessonId
 * @returns {Promise<Lesson>}
 */
const deleteLessonById = async (lessonId) => {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
        throw new ApiError(httpStatus.NOT_FOUND, 'lesson not found');
    }
    await lesson.remove();
    return lesson;
};

/**
 * Get all study levels
 * @returns {Promise<QueryResult>}
 */
const getStudyLevels = async (userId) => {
    const user = User.findById(userId);
    const blocks = await queryBlock();

    let blockIds = blocks.map(obj => {
        return obj._id
    })
    const classes = await queryClassList(blockIds);
    classes.forEach((element, index) => {
        if (!user.role.includes(roles.admin) && element.age > user.age) {
            classes.splice(index, 1);
        }
    })
    let classIds = classes.map(obj => {
        return obj._id
    })
    const lectureList = await queryLectureList(classIds);

    let result = [];
    blocks.forEach(element => {
        var itemData = {
            blockTitle: element.title,
            order: element.order,
            classes: []
        }
        classes.filter(e => e.blockId === element._id)
            .sort((a, b) => (a.order > b.order) ? 1 : -1).forEach(classElement => {
                var classItem = {
                    classTitle: classElement.title,
                    order: classElement.order,
                    lectureList: []
                }
                lectureList.filter(e => e.classId === classElement._id)
                    .sort((a, b) => (a.order > b.order) ? 1 : -1).forEach(lectureElement => {
                        var lectureItem = {
                            title: lectureElement.title,
                            order: lectureElement.order,
                            thumbnail: lectureElement.thumbnail
                        }

                        classItem.lectureList.push(lectureItem);
                    })

                itemData.classes.push(classItem);
            });

        result.push(itemData);
    });

    return result;
};

module.exports = {
    updateClassById,
    updateLectureById,
    updateLessonById,
    deleteBlockById,
    deleteClassById,
    deleteLectureById,
    deleteLessonById,
    updateBlockById,
    queryLesson,
    queryLecture,
    queryBlock,
    queryClass,
    createLesson,
    createBlock,
    createClass,
    createLecture,
    getStudyLevels
};
