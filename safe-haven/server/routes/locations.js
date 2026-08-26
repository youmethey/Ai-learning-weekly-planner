import express from 'express';
import { store } from '../config/db.js';

const router = express.Router();

// GET /api/locations - list & search locations
router.get('/', (req, res) => {
  try {
    const { search, category, perspective, minScore } = req.query;
    const locations = store.getLocations({ search, category, perspective, minScore });
    res.json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/locations/:id - get single location
router.get('/:id', (req, res) => {
  try {
    const location = store.getLocationById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({
      success: true,
      data: location
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/locations/:id/reviews - submit safety tip or review
router.post('/:id/reviews', (req, res) => {
  try {
    const { comment, rating, author, avatar } = req.body;
    if (!comment) {
      return res.status(400).json({ success: false, error: 'Comment text is required' });
    }
    const updated = store.addLocationReview(req.params.id, { comment, rating, author, avatar });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.status(201).json({
      success: true,
      message: 'Safety review posted! Thank you for protecting the community 🌸',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
