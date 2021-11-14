const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const learningValidation = require('../../validations/learning.validation');
const learningController = require('../../controllers/learning.controller');

const router = express.Router();

router
    .route('/levels')
    .get(auth(), learningController.getStudyLevels);

router
    .route('/block/:blockId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateBlock), learningController.updateBlock)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteBlock), learningController.deleteBlock);

router
    .route('/block/')
    .post(auth('manageAdmin'), validate(learningValidation.createBlock), learningController.createBlock);

router
    .route('/class/:classId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateClass), learningController.updateClass)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteClass), learningController.deleteClass);

router
    .route('/class/')
    .post(auth('manageAdmin'), validate(learningValidation.createClass), learningController.createClass)

router
    .route('/lecture/:lectureId')
    .get(auth(), validate(learningValidation.getLessonList), learningController.getLessons)
    .patch(auth('manageAdmin'), validate(learningValidation.updateLecture), learningController.updateLecture)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteLecture), learningController.deleteLecture);

router
    .route('/lecture/')
    .post(auth('manageAdmin'), validate(learningValidation.createLecture), learningController.createLecture)

router
    .route('/lesson/:lessonId')
    .patch(auth('manageAdmin'), validate(learningValidation.updateLesson), learningController.updateLesson)
    .delete(auth('manageAdmin'), validate(learningValidation.deleteLesson), learningController.deleteLesson);

router
    .route('/lesson/')
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
 *
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