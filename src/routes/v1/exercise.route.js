const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const exerciseValidation = require('../../validations/exercise.validation');
const exerciseController = require('../../controllers/exercise.controller');

const router = express.Router();

router
    .route('/')
    .post(auth('manageAdmin'), validate(exerciseValidation.createExercise), exerciseController.createExercise)
    .get(auth(), validate(exerciseValidation.getExerciseList), exerciseController.getExerciseList);

router
    .route('/info/:exerciseId')
    .get(auth(), validate(exerciseValidation.getExercise), exerciseController.getExercise)
    .patch(auth('manageAdmin'), validate(exerciseValidation.updateExercise), exerciseController.updateExercise)
    .delete(auth('manageAdmin'), validate(exerciseValidation.deleteExercise), exerciseController.deleteExercise);

router
    .route('/calculate/:exerciseId')
    .patch(auth(), validate(exerciseValidation.calculateExercise), exerciseController.calculateExercise)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Exercise
 *   description: Exercise management and retrieval
 */

/**
 * @swagger
 * /exercise:
 *   post:
 *     summary: Create a Exercise
 *     description: Only admins can create other Exercise.
 *     tags: [Exercise]
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
 *               - lessonId
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               lessonId:
 *                 type: string
 *               questions:
 *                 type: array
 *                  items :'#/components/schemas/QuestionExam'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exercise'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Exercise
 *     description: Authorized users retrieve exercise.
 *     tags: [Exercise]
 *      security:
 *       - bearerAuth: []
 *     parameters:
 *          - in: query
 *         name: lessonId
 *         schema:
 *           type: string
 *         description: Lesson id
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
 *         description: Maximum number of News
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
 *                     $ref: '#/components/schemas/Exercise'
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /exercise/info/{id}:
 *   get:
 *     summary: Get a Exercise
 *     description: Authorized users can fetch exercise.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exercise'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Exercise
 *     description: Only admins can update other Exercise.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: News id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - lessonId
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               lessonId:
 *                 type: string
 *               questions:
 *                 type: array
 *                  items :'#/components/schemas/QuestionExam'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exercise'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Exercise
 *     description: Only admins can delete other Exercise.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise id
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
 *  @swagger
 * /exercise/info/{id}:
 * patch:
 *     summary: Calculate score of a exercise
 *     description: Authorized users can request calculate exercise.
 *     tags: [Exercise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: exercise id
 *     requestBody:
 *       required: true
 *       content:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - questions
 *             properties:
 *               questions:
 *                 type: array
 *                  items :
 *                      questionId:
 *                          type: string
 *                      answer: 
 *                          type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  exerciseId:
 *                      type: string
 *                  score:
 *                      type: number
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 */
