const API_BASE = '/api';

export async function fetchLocations(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.minScore) query.append('minScore', params.minScore);
  if (params.perspective) query.append('perspective', params.perspective);

  const res = await fetch(`${API_BASE}/locations?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json();
}

export async function fetchLocationById(id) {
  const res = await fetch(`${API_BASE}/locations/${id}`);
  if (!res.ok) throw new Error('Failed to fetch location details');
  return res.json();
}

export async function submitLocationReview(id, review) {
  const res = await fetch(`${API_BASE}/locations/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return res.json();
}

export async function fetchHangouts() {
  const res = await fetch(`${API_BASE}/hangouts`);
  if (!res.ok) throw new Error('Failed to fetch hangouts');
  return res.json();
}

export async function createHangout(hangout) {
  const res = await fetch(`${API_BASE}/hangouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hangout)
  });
  if (!res.ok) throw new Error('Failed to schedule hangout');
  return res.json();
}

export async function updateHangout(id, updates) {
  const res = await fetch(`${API_BASE}/hangouts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update hangout');
  return res.json();
}

export async function checkInHangout(id) {
  const res = await fetch(`${API_BASE}/hangouts/${id}/checkin`, {
    method: 'POST'
  });
  if (!res.ok) throw new Error('Failed to record check-in');
  return res.json();
}

export async function deleteHangout(id) {
  const res = await fetch(`${API_BASE}/hangouts/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete hangout');
  return res.json();
}

export async function fetchContacts() {
  const res = await fetch(`${API_BASE}/contacts`);
  if (!res.ok) throw new Error('Failed to fetch trusted contacts');
  return res.json();
}

export async function createContact(contact) {
  const res = await fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  if (!res.ok) throw new Error('Failed to add contact');
  return res.json();
}

export async function updateContact(id, updates) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update contact');
  return res.json();
}

export async function deleteContact(id) {
  const res = await fetch(`${API_BASE}/contacts/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
}

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateProfile(updates) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function triggerSosAlert(alertData) {
  const res = await fetch(`${API_BASE}/safety/sos-alert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alertData)
  });
  if (!res.ok) throw new Error('Failed to trigger SOS alert');
  return res.json();
}

export async function submitSafetyReport(reportData) {
  const res = await fetch(`${API_BASE}/safety/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reportData)
  });
  if (!res.ok) throw new Error('Failed to submit safety report');
  return res.json();
}
