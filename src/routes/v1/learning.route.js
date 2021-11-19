const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const learningValidation = require('../../validations/learning.validation');
const learningController = require('../../controllers/learning.controller');

const router = express.Router();

router
    .route('/levels')
    .get(learningController.getStudyLevels);

router
    .route('/block/:blockId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateBlock), learningController.updateBlock)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteBlock), learningController.deleteBlock);

router
    .route('/block/')
    .get(learningController.getListBlock)
    .post(auth('manageAdmin'), validate(learningValidation.createBlock), learningController.createBlock);

router
    .route('/class/:classId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateClass), learningController.updateClass)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteClass), learningController.deleteClass);

router
    .route('/class/')
    .get(learningController.getListClass)
    .post(auth('manageAdmin'), validate(learningValidation.createClass), learningController.createClass)

router
    .route('/lecture/:lectureId')
    .get(auth(), validate(learningValidation.getLessonList), learningController.getLessons)
    .patch(auth('manageAdmin'), validate(learningValidation.updateLecture), learningController.updateLecture)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteLecture), learningController.deleteLecture);

router
    .route('/lecture/')
    .get(learningController.getListLecture)
    .post(auth('manageAdmin'), validate(learningValidation.createLecture), learningController.createLecture)

router
    .route('/lesson/:lessonId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateLesson), learningController.updateLesson)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteLesson), learningController.deleteLesson);

router
    .route('/lesson/')
    .get(auth(), learningController.getListLesson)
    .post(auth('manageAdmin'), validate(learningValidation.createLesson), learningController.createLesson)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Study
 *   description: Study management and retrieval
 */

/**
 * @swagger
 * /study/block:
 *   post:
 *     summary: Create a block
 *     description: Only admins can create other block.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Block'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 *   get:
 *     summary: Get all Blocks
 *     description: Everyone retrieve all Blocks.
 *     tags: [Study]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Block' title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of block
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Block'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /study/block/{blockId}:
 *   patch:
 *     summary: Update a Block
 *     description: Only admins can update other block.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: block id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Block'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a block
 *     description: Only admins can delete other block.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: block id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /study/class:
 * 
 *   get:
 *     summary: Get all classes
 *     description: Everyone retrieve all classes.
 *     tags: [Study]
 *     parameters:
 *       - in: query
 *         name: blockId
 *         schema:
 *           type: string
 *         description: Block' id
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Class' title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of class
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Class'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 *   post:
 *     summary: Create a class
 *     description: Only admins can create other class.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - blockId
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               blockId:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Class'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */


/** 
 * @swagger
 * /study/class/{classId}:
 *   patch:
 *     summary: Update a class
 *     description: Only admins can update other class.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: block id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - blockId
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               blockId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Class'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a class
 *     description: Only admins can delete other class.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: class id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /study/lecture:
 * 
 *   get:
 *     summary: Get all lectures
 *     description: Everyone retrieve all lectures.
 *     tags: [Study]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Lecture' title
 *       - in: query
 *         name: classId
 *         schema:
 *           type: string
 *         description: class' id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of Lecture
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lecture'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 *   post:
 *     summary: Create a lecture
 *     description: Only admins can create other lecture.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - thumbnail
 *               - classId
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               thumbnail:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lecture'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/** 
 * @swagger
 * /study/lecture/{lectureId}:
 * 
 *   patch:
 *     summary: Update a lecture
 *     description: Only admins can update other lecture.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lecture id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - thumbnail
 *               - classId
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               thumbnail:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lecture'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   get:
 *     summary: Get lesson in a lecture
 *     description: Only authorized user can access.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lecture id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     summary: Delete a lecture
 *     description: Only admins can delete other lecture.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lecture id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /study/lesson:
 *   get:
 *     summary: Get all lessons
 *     description: Everyone retrieve all lessons.
 *     tags: [Study]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Lesson' title
 *       - in: query
 *         name: lectureId
 *         schema:
 *           type: string
 *         description: lecture's id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of Lesson
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lesson'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 *   post:
 *     summary: Create a lesson
 *     description: Only admins can create other lesson.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - url
 *               - lectureId
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               url:
 *                 type: string
 *               lectureId:
 *                 type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /study/lesson/{lessonId}:
 * 
 *   patch:
 *     summary: Update a lesson
 *     description: Only admins can update other lesson.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lesson id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - url
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               order:
 *                 type: number
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Lesson'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a lesson
 *     description: Only admins can delete other lesson.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: lesson id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /study/levels:
 *   get:
 *     summary: Get all study levels
 *     description: Authorized users can fetch study levels.
 *     tags: [Study]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  type: object
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */