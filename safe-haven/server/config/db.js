import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { seedLocations, seedContacts, seedHangouts, seedProfile } from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'store.json');

// In-Memory & Local JSON Store
class DataStore {
  constructor() {
    this.data = {
      locations: [...seedLocations],
      contacts: [...seedContacts],
      hangouts: [...seedHangouts],
      profile: { ...seedProfile },
      reports: []
    };
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.locations && parsed.locations.length > 0) {
          this.data = parsed;
          console.log('📦 Loaded existing persistent store from disk.');
          return;
        }
      }
      this.saveToDisk();
    } catch (err) {
      console.warn('⚠️ Could not load data from disk, using seed data:', err.message);
    }
  }

  saveToDisk() {
    try {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to disk:', err.message);
    }
  }

  // Locations
  getLocations(query = {}) {
    let list = [...this.data.locations];
    const { search, category, minScore } = query;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        l =>
          l.name.toLowerCase().includes(q) ||
          l.neighborhood.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q) ||
          (l.tags && l.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (category && category !== 'All') {
      list = list.filter(l => l.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (minScore) {
      const min = parseFloat(minScore);
      list = list.filter(l => l.safetyScore >= min);
    }

    return list;
  }

  getLocationById(id) {
    return this.data.locations.find(l => l.id === id);
  }

  addLocationReview(locationId, review) {
    const loc = this.getLocationById(locationId);
    if (!loc) return null;
    if (!loc.communityTips) loc.communityTips = [];
    const newTip = {
      author: review.author || 'Anonymous Safe Explorer 🌸',
      avatar: review.avatar || '✨',
      date: 'Just now',
      comment: review.comment,
      rating: review.rating || 5
    };
    loc.communityTips.unshift(newTip);
    this.saveToDisk();
    return loc;
  }

  // Hangouts
  getHangouts() {
    return [...this.data.hangouts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getHangoutById(id) {
    return this.data.hangouts.find(h => h.id === id);
  }

  createHangout(hangoutData) {
    const newHangout = {
      id: `hangout-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'planned',
      lastCheckIn: null,
      visited: false,
      safetyRatingGiven: null,
      ...hangoutData
    };
    this.data.hangouts.unshift(newHangout);
    this.saveToDisk();
    return newHangout;
  }

  updateHangout(id, updates) {
    const index = this.data.hangouts.findIndex(h => h.id === id);
    if (index === -1) return null;
    this.data.hangouts[index] = {
      ...this.data.hangouts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveToDisk();
    return this.data.hangouts[index];
  }

  deleteHangout(id) {
    const index = this.data.hangouts.findIndex(h => h.id === id);
    if (index === -1) return false;
    this.data.hangouts.splice(index, 1);
    this.saveToDisk();
    return true;
  }

  // Contacts
  getContacts() {
    return [...this.data.contacts];
  }

  createContact(contactData) {
    const newContact = {
      id: `contact-${Date.now()}`,
      avatar: contactData.avatar || '💖',
      isPrimary: contactData.isPrimary || false,
      notifyOnStart: contactData.notifyOnStart !== false,
      notifyOnDelay: contactData.notifyOnDelay !== false,
      ...contactData
    };
    this.data.contacts.push(newContact);
    this.saveToDisk();
    return newContact;
  }

  updateContact(id, updates) {
    const index = this.data.contacts.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.contacts[index] = { ...this.data.contacts[index], ...updates };
    this.saveToDisk();
    return this.data.contacts[index];
  }

  deleteContact(id) {
    const index = this.data.contacts.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.data.contacts.splice(index, 1);
    this.saveToDisk();
    return true;
  }

  // Profile
  getProfile() {
    return { ...this.data.profile };
  }

  updateProfile(updates) {
    this.data.profile = {
      ...this.data.profile,
      ...updates,
      emergencyPreferences: {
        ...this.data.profile.emergencyPreferences,
        ...(updates.emergencyPreferences || {})
      }
    };
    this.saveToDisk();
    return this.data.profile;
  }

  // Reports
  createReport(report) {
    const newReport = {
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'verified',
      ...report
    };
    this.data.reports.unshift(newReport);
    this.saveToDisk();
    return newReport;
  }
}

export const store = new DataStore();

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      console.log(' Connected to MongoDB Atlas / Instance');
    } catch (err) {
      console.log('ℹ️ MongoDB not available locally, running on built-in persistent storage engine:', err.message);
    }
  } else {
    console.log('ℹ️ Running with built-in persistent storage engine (MongoDB ready).');
  }
}
