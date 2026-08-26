import express from 'express';
import { store } from '../config/db.js';

const router = express.Router();

// GET /api/profile
router.get('/', (req, res) => {
  try {
    const profile = store.getProfile();
    const hangouts = store.getHangouts();
    const visitedCount = hangouts.filter(h => h.visited || h.status === 'completed').length;
    
    res.json({
      success: true,
      data: {
        ...profile,
        safeHangoutsCompleted: visitedCount || profile.safeHangoutsCompleted
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/profile
router.put('/', (req, res) => {
  try {
    const updated = store.updateProfile(req.body);
    res.json({
      success: true,
      message: 'Profile & safety preferences updated ✨',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
