const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  createQuiz,
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
} = require('../controllers/quizController');

const router = express.Router();

// Teacher creates a quiz
router.post('/create', protect, authorize('Teacher'), createQuiz);

// Students get quizzes for a course
router.get('/course/:courseId', protect, authorize('Student'), getQuizzesByCourse);

// Get a specific quiz by ID
router.get('/:quizId', protect, getQuizById);

// Student submits a quiz
router.post('/submit/:quizId', protect, authorize('Student'), submitQuiz);

module.exports = router;
