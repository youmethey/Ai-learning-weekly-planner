import express from 'express';
import { store } from '../config/db.js';

const router = express.Router();

// GET /api/hangouts - list all hangouts
router.get('/', (req, res) => {
  try {
    const hangouts = store.getHangouts();
    res.json({
      success: true,
      count: hangouts.length,
      data: hangouts
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/hangouts/:id - get single hangout
router.get('/:id', (req, res) => {
  try {
    const hangout = store.getHangoutById(req.params.id);
    if (!hangout) {
      return res.status(404).json({ success: false, error: 'Hangout plan not found' });
    }
    res.json({
      success: true,
      data: hangout
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/hangouts - create new hangout plan
router.post('/', (req, res) => {
  try {
    const {
      locationId,
      locationName,
      category,
      date,
      startTime,
      endTime,
      hangoutType,
      companionName,
      checkInIntervalMinutes,
      batteryAlertEnabled,
      shareLocationEnabled,
      selectedContactIds,
      notes
    } = req.body;

    if (!locationName || !date || !startTime) {
      return res.status(400).json({
        success: false,
        error: 'Location name, date, and start time are required.'
      });
    }

    const newHangout = store.createHangout({
      locationId: locationId || 'custom',
      locationName,
      category: category || 'Outing',
      date,
      startTime,
      endTime: endTime || 'TBD',
      hangoutType: hangoutType || 'Casual Hangout 🌸',
      companionName: companionName || 'Solo',
      checkInIntervalMinutes: checkInIntervalMinutes || 45,
      batteryAlertEnabled: batteryAlertEnabled !== false,
      shareLocationEnabled: shareLocationEnabled !== false,
      selectedContactIds: selectedContactIds || [],
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Hangout scheduled safely! Trusted contacts have been prepared ✨',
      data: newHangout
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/hangouts/:id - update status, check-in, or visit review
router.patch('/:id', (req, res) => {
  try {
    const updated = store.updateHangout(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Hangout not found' });
    }
    res.json({
      success: true,
      message: 'Hangout updated successfully ✨',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/hangouts/:id/checkin - safety check-in ping
router.post('/:id/checkin', (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const updated = store.updateHangout(req.params.id, {
      lastCheckIn: timestamp,
      status: 'active'
    });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Hangout not found' });
    }
    res.json({
      success: true,
      message: 'Check-in recorded! Your trusted contacts can see you are safe 💕',
      lastCheckIn: timestamp,
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/hangouts/:id - remove hangout
router.delete('/:id', (req, res) => {
  try {
    const success = store.deleteHangout(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Hangout not found' });
    }
    res.json({
      success: true,
      message: 'Hangout plan removed.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
