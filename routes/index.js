const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authorize, ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/StoryModel');

// @desc    Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('home', {
    layout: 'home',
  });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, authorize('patient'), async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user._id }).lean();
    // const stories = await Story.find({}).lean();

    res.render('dashboard', {
      username: req.user.username,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500', {
      layout: 'error',
    });
  }
});

// @desc    Dashboard-staff
// @route   GET /dashboard-staff
router.get(
  '/dashboard-staff',
  ensureAuth,
  authorize('nurse', 'doctor'),
  async (req, res) => {
    try {
      res.render('dashboard-staff', {
        role: req.user.role,
      });
    } catch (err) {
      console.error(err);
      res.render('error/500', {
        layout: 'error',
      });
    }
  }
);

module.exports = router;
