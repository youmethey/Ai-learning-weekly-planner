# SafeHaven 🌸 - Personal Safety Hangout Planner

A full-stack web application built for **women's and men's safety** when planning hangouts, exploring unfamiliar neighborhoods, or enjoying late-night outings. Designed with a soft, comforting pastel aesthetic (pinks, lilacs, mints, and butter yellows) to make safety empowering, proactive, and reassuring — not fear-based! 💕

---

## ✨ Key Features

1. **Interactive Safety Map & Venue Explorer**:
   - Built on OpenStreetMap & Leaflet with custom pastel pins and safe haven markers.
   - **1–5 Star Safety Ratings** with metrics for Street Lighting, Crowd Density, Emergency Response Time, and Walkability.
   - **Safe Time Windows**: Clear guidelines on safest hours (e.g. *7:30 AM – 10:30 PM*), caution time frames, and peak crowd hours.
   - **Safe Haven Hotspots**: 24/7 pharmacies, police help kiosks, well-lit transit stations, and hospital ERs.

2. **Gender-Specific Safety Views**:
   - 🌸 **Women's Safety Lens**: Street lighting quality, harassment incidence, female staff/management, safe rideshare pickup points.
   - 🛡️ **Men's Safety Lens**: Nightlife altercation risk, ATM/theft scam zones, secluded parking risk, vehicle security.
   - ✨ **General Safety Lens**: Balanced overall safety scores and emergency response data.

3. **Hangout Planner & Live Journey Mode**:
   - Schedule outings with venue, date, time window, and companion type.
   - Select trusted contacts to automatically receive live tracking updates.
   - **Safe Check-in Timer**: Countdown timer (30m, 45m, 1h) with *"I'm Safe & Having Fun 💕"* one-tap check-in.
   - Low battery warning & safe arrival notifications.

4. **Safety Toolkit & Escape Tools**:
   - 📞 **Escape Fake Call Simulator**: Generates realistic incoming smartphone call with audio ringtone, caller ID (*"Mom 💕"*, *"Bestie 🌸"*), answering screen, and voice synthesis speech to gracefully excuse yourself from uncomfortable situations.
   - 🚨 **Emergency SOS Console**: Loud high-pitch siren alarm, one-tap emergency broadcast with exact GPS coordinates to trusted contacts, and direct 1-tap call buttons for Police (911/100) and Women's Helpline (1091).
   - ✅ **Pre-Outing Safety Checklist**: Quick 30-second preparation guide.

5. **Profile, Safety Badges & Trusted Circle**:
   - Log of visited places with safety ratings and notes.
   - Safety streaks & badges (*"Safe Explorer 🌸"*, *"Check-in Champion ✨"*, *"Night Owl Shield 🛡️"*).
   - Full CRUD management of trusted emergency contacts circle.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Leaflet (OpenStreetMap) + Lucide Icons + Canvas Confetti + Custom Vanilla CSS Pastel Design System
- **Backend**: Node.js + Express.js + REST API
- **Database**: MongoDB (Mongoose) with seamless zero-config persistent local store fallback (works instantly on any machine out of the box!)

---

## 🚀 How to Run Locally

### Option 1: Run Both Backend & Frontend with One Command
```bash
cd safe-haven
npm run dev
```

### Option 2: Run Separately

1. **Start Backend Server**:
```bash
cd safe-haven/server
npm install
npm run dev
# Server will run on http://localhost:5000
```

2. **Start Frontend App**:
```bash
cd safe-haven/client
npm install
npm run dev
# App will run on http://localhost:5173
```

3. Open your browser and navigate to:
👉 **`http://localhost:5173`**
