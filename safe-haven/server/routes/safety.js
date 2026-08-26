import express from 'express';
import { store } from '../config/db.js';

const router = express.Router();

// POST /api/safety/sos-alert - trigger simulated emergency dispatch
router.post('/sos-alert', (req, res) => {
  try {
    const { coordinates, locationName, customMessage, batteryLevel } = req.body;
    const contacts = store.getContacts().filter(c => c.isPrimary || c.notifyOnStart);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const alertLog = {
      id: `sos-${Date.now()}`,
      timestamp,
      locationName: locationName || 'Unknown Current Location',
      coordinates: coordinates || { lat: 40.73061, lng: -73.99244 },
      batteryLevel: batteryLevel || '84%',
      notifiedContactsCount: contacts.length,
      smsPayload: `🚨 [SafeHaven SOS] Emergency alert triggered by Aria at ${timestamp}. Location: ${locationName || 'Current GPS'}. Coordinates: ${coordinates ? `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}` : 'Live Link'}. Battery: ${batteryLevel || '84%'}. Please check in immediately!`,
      status: 'dispatched'
    };

    res.json({
      success: true,
      message: `🚨 Emergency dispatch sent to ${contacts.length} trusted contacts!`,
      data: alertLog
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/safety/report - community safety reporting
router.post('/report', (req, res) => {
  try {
    const { locationName, address, reportType, safetyCategory, description, severity } = req.body;
    if (!description || !locationName) {
      return res.status(400).json({
        success: false,
        error: 'Location name and description are required.'
      });
    }

    const newReport = store.createReport({
      locationName,
      address: address || '',
      reportType: reportType || 'lighting_update', // 'lighting_update', 'safe_haven_suggestion', 'harassment_warning', 'positive_review'
      safetyCategory: safetyCategory || 'General Safety',
      description,
      severity: severity || 'info'
    });

    res.status(201).json({
      success: true,
      message: 'Safety report submitted to community moderation. Thank you for protecting everyone! 🌸',
      data: newReport
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
