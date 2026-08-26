import express from 'express';
import { store } from '../config/db.js';

const router = express.Router();

// GET /api/contacts - list trusted contacts
router.get('/', (req, res) => {
  try {
    const contacts = store.getContacts();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/contacts - create trusted contact
router.post('/', (req, res) => {
  try {
    const { name, relationship, phone, email, isPrimary, avatar } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name and phone number are required.'
      });
    }
    const newContact = store.createContact({
      name,
      relationship: relationship || 'Friend',
      phone,
      email: email || '',
      isPrimary: isPrimary || false,
      avatar: avatar || '🌸'
    });
    res.status(201).json({
      success: true,
      message: 'Trusted contact added! 💖',
      data: newContact
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/contacts/:id - update trusted contact
router.put('/:id', (req, res) => {
  try {
    const updated = store.updateContact(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.json({
      success: true,
      message: 'Contact updated ✨',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/contacts/:id - delete trusted contact
router.delete('/:id', (req, res) => {
  try {
    const success = store.deleteContact(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    res.json({
      success: true,
      message: 'Contact removed from safety circle.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
