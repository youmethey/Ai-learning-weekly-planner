// Comprehensive realistic seed safety data for locations
export const seedLocations = [
  {
    id: "loc-1",
    name: "Bloom & Bean Botanical Cafe",
    category: "Cafe & Lounge",
    neighborhood: "Central Arts District",
    address: "142 Blossom Avenue, Arts Quarter",
    coordinates: { lat: 40.73061, lng: -73.99244 },
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    tags: ["Well-Lit", "Female Staff 24/7", "Bustling", "CCTV Protected", "Near Metro"],
    safetyScore: 4.9, // 1 to 5
    overallRating: 5,
    safeTimeWindows: {
      safest: "07:30 AM – 10:30 PM",
      caution: "10:30 PM – 01:00 AM",
      nightSafetyLevel: "High", // High, Moderate, Low
      daySafetyLevel: "Very High",
      recommendedDeparture: "Before 11:30 PM for easiest transit access",
      peakCrowdHours: "02:00 PM – 08:30 PM"
    },
    genderSafety: {
      womenScore: 4.9,
      womenSummary: "Exceptionally safe for solo women & groups. Female managers on shift, brightly illuminated sidewalk patio, verified safe cab pickup bay right outside.",
      womenHighlights: [
        "🌸 Designated safe rideshare waiting booth with security guard",
        "🌸 Active female barista & management presence",
        "🌸 Zero recorded harassment incidents in past 24 months",
        "🌸 Well-lit indoor & outdoor seating areas"
      ],
      menScore: 4.8,
      menSummary: "Very safe, peaceful ambiance with zero nightlife altercation history. Safe underground monitored bike/car parking.",
      menHighlights: [
        "🛡️ Secure monitored bike racks & CCTV parking",
        "🛡️ Zero reported theft or scam activity",
        "🛡️ Clear line of sight along main pedestrian boulevard"
      ],
      generalScore: 4.9
    },
    riskIndicators: {
      lightingRating: 5, // 1-5
      crowdDensity: 4, // 1-5
      policePatrolFrequency: 4, // 1-5
      emergencyResponseTimeMin: 3, // minutes
      theftRisk: "Very Low",
      harassmentRisk: "Minimal",
      isolatedAreaRisk: "None",
      walkScore: 98
    },
    safeHavenHubs: [
      { name: "City Care 24/7 Pharmacy", type: "Medical & Safe Spot", distance: "45m away", icon: "💊" },
      { name: "Arts Quarter Metro Station (Attended)", type: "Public Transit", distance: "110m away", icon: "🚇" },
      { name: "Police Community Help Kiosk", type: "Police / Emergency", distance: "200m away", icon: "👮" }
    ],
    communityTips: [
      {
        author: "Maya S.",
        avatar: "🌸",
        date: "2 days ago",
        comment: "I always study here late until 9:30 PM! The staff walked me to my cab when it started raining. Super sweet!",
        rating: 5
      },
      {
        author: "Alex T.",
        avatar: "✨",
        date: "Last week",
        comment: "Great lighting around the plaza and plenty of students and families around. Very safe vibe.",
        rating: 5
      }
    ]
  },
  {
    id: "loc-2",
    name: "Riverlight Promenade & Garden",
    category: "Park & Waterfront",
    neighborhood: "Westside Waterfront",
    address: "88 Riverside Boulevard",
    coordinates: { lat: 40.74189, lng: -74.00481 },
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
    tags: ["Scenic Walk", "Solar Lamp Posts", "Emergency Call Boxes", "Jogging Hub"],
    safetyScore: 4.6,
    overallRating: 5,
    safeTimeWindows: {
      safest: "06:00 AM – 09:00 PM",
      caution: "09:00 PM – 11:30 PM (Stick to Main Lit Promenade)",
      nightSafetyLevel: "Moderate-High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "By 10:00 PM unless in a group",
      peakCrowdHours: "07:00 AM – 11:00 AM & 05:00 PM – 08:30 PM"
    },
    genderSafety: {
      womenScore: 4.5,
      womenSummary: "Popular with women joggers & walking groups. Solar LED poles line the river. Keep to the north paved pathway after dusk.",
      womenHighlights: [
        "🌸 Active female running clubs daily 6-9 PM",
        "🌸 SOS emergency intercom towers every 150 meters",
        "🌸 Park ranger patrol until 10:00 PM"
      ],
      menScore: 4.7,
      menSummary: "Wide open trails with great visibility. Safe for evening runs and bike commutes.",
      menHighlights: [
        "🛡️ Dedicated bike lane with motion-sensor lighting",
        "🛡️ Low crime index, well maintained pathways"
      ],
      generalScore: 4.6
    },
    riskIndicators: {
      lightingRating: 4,
      crowdDensity: 4,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 4,
      theftRisk: "Low",
      harassmentRisk: "Low",
      isolatedAreaRisk: "Low (south woods unlit after 9 PM)",
      walkScore: 92
    },
    safeHavenHubs: [
      { name: "Riverside Ferry Terminal (Security Onsite)", type: "Transit & Security", distance: "90m away", icon: "⛴️" },
      { name: "Waterfront Cafe & First Aid Station", type: "First Aid / Staffed", distance: "160m away", icon: "☕" }
    ],
    communityTips: [
      {
        author: "Priya R.",
        avatar: "💖",
        date: "3 days ago",
        comment: "The sunset is gorgeous here! After 9 PM, just stick to the central illuminated fountain area where everyone is.",
        rating: 4.5
      }
    ]
  },
  {
    id: "loc-3",
    name: "Starlight Sky Lounge & Terrace",
    category: "Rooftop & Dining",
    neighborhood: "Midtown Heights",
    address: "550 Skyline Tower, 18th Floor",
    coordinates: { lat: 40.75889, lng: -73.98513 },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    tags: ["Valet Parking", "Building Security", "Late Night Safe", "ID Check"],
    safetyScore: 4.8,
    overallRating: 5,
    safeTimeWindows: {
      safest: "05:00 PM – 12:30 AM",
      caution: "12:30 AM – 02:00 AM",
      nightSafetyLevel: "Very High",
      daySafetyLevel: "High",
      recommendedDeparture: "Valet & designated rideshare pickup inside tower garage",
      peakCrowdHours: "07:30 PM – 11:30 PM"
    },
    genderSafety: {
      womenScore: 4.9,
      womenSummary: "Exceptional night venue safety. Private security checks, well-monitored elevators, drink safety covers available on request.",
      womenHighlights: [
        "🌸 Drink covers & test strips provided free at bar",
        "🌸 Security escorts to taxis/valet on request",
        "🌸 Strict dress code & respectful crowd vibe"
      ],
      menScore: 4.8,
      menSummary: "Safe upscale setting. Zero tolerance for brawls or harassment with swift security intervention.",
      menHighlights: [
        "🛡️ Monitored secure valet parking lot",
        "🛡️ Zero scam or overcharging complaints verified"
      ],
      generalScore: 4.8
    },
    riskIndicators: {
      lightingRating: 5,
      crowdDensity: 4,
      policePatrolFrequency: 5,
      emergencyResponseTimeMin: 2,
      theftRisk: "Very Low",
      harassmentRisk: "Minimal",
      isolatedAreaRisk: "None",
      walkScore: 99
    },
    safeHavenHubs: [
      { name: "Skyline Tower Security Desk 24/7", type: "Security Hub", distance: "Inside lobby (10m)", icon: "🛡️" },
      { name: "Midtown General Hospital ER", type: "Hospital", distance: "350m away", icon: "🏥" }
    ],
    communityTips: [
      {
        author: "Elena K.",
        avatar: "⭐",
        date: "Yesterday",
        comment: "Great spot for a first date or birthday hangout! The security team even called our Uber and confirmed the license plate.",
        rating: 5
      }
    ]
  },
  {
    id: "loc-4",
    name: "Pastel Moon Dessert & Boba Bar",
    category: "Dessert & Boba",
    neighborhood: "Little Tokyo / Cultural Hub",
    address: "21 Sakura Lane, Plaza Level",
    coordinates: { lat: 40.72815, lng: -73.98920 },
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tags: ["Pastel Aesthetic", "Youth & Student Hub", "Brightly Lit", "Family Friendly"],
    safetyScore: 4.9,
    overallRating: 5,
    safeTimeWindows: {
      safest: "10:00 AM – 11:00 PM",
      caution: "11:00 PM – 01:00 AM",
      nightSafetyLevel: "High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "Closes at 11:30 PM; crowd stays vibrant",
      peakCrowdHours: "03:00 PM – 09:30 PM"
    },
    genderSafety: {
      womenScore: 5.0,
      womenSummary: "One of the highest-rated safe spaces in town for girls' nights out, teen meetups, and solo study sessions.",
      womenHighlights: [
        "🌸 Welcoming, open, and cheerful atmosphere",
        "🌸 100% brightly lit glass facade & street frontage",
        "🌸 Women-owned business with active community care"
      ],
      menScore: 4.8,
      menSummary: "Casual, friendly, highly populated social spot with zero safety concerns.",
      menHighlights: [
        "🛡️ Friendly crowd, zero aggressive nightlife",
        "🛡️ Ample sidewalk pedestrian traffic"
      ],
      generalScore: 4.9
    },
    riskIndicators: {
      lightingRating: 5,
      crowdDensity: 5,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 3,
      theftRisk: "Very Low",
      harassmentRisk: "None",
      isolatedAreaRisk: "None",
      walkScore: 97
    },
    safeHavenHubs: [
      { name: "Sakura Plaza 24/7 Convenience Store", type: "Safe Haven", distance: "20m away", icon: "🏪" },
      { name: "Transit Bus Station (Illuminated Shelter)", type: "Transit", distance: "50m away", icon: "🚌" }
    ],
    communityTips: [
      {
        author: "Chloe W.",
        avatar: "🌸",
        date: "4 days ago",
        comment: "Cutest matcha waffles ever and the area is always filled with couples, students, and friendly folks!",
        rating: 5
      }
    ]
  },
  {
    id: "loc-5",
    name: "Golden Hour Artisan Night Market",
    category: "Market & Street Food",
    neighborhood: "Old Town Market Square",
    address: "300 Heritage Square",
    coordinates: { lat: 40.71900, lng: -73.99800 },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    tags: ["High Foot Traffic", "Street Lights", "Community Marshals", "Live Music"],
    safetyScore: 4.4,
    overallRating: 4.5,
    safeTimeWindows: {
      safest: "04:00 PM – 09:30 PM",
      caution: "09:30 PM – 11:30 PM (Watch personal belongings in dense crowds)",
      nightSafetyLevel: "Moderate-High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "Leave before 10:30 PM when vendor stalls begin packing up",
      peakCrowdHours: "06:00 PM – 09:00 PM"
    },
    genderSafety: {
      womenScore: 4.3,
      womenSummary: "Fun, vibrant food & craft market. Dense crowds mean minimal physical danger, but keep bags zipped to avoid pickpockets.",
      womenHighlights: [
        "🌸 Market safety marshals wearing pink vests stationed at each alley",
        "🌸 Well-staffed info booth with free phone charging & emergency help",
        "🌸 High presence of female artisans and visitors"
      ],
      menScore: 4.5,
      menSummary: "Energetic market square. Keep wallets in front pockets in crowded food queue lines.",
      menHighlights: [
        "🛡️ Good crowd control with security presence",
        "🛡️ Watch out for minor pickpocketing in crowded aisles"
      ],
      generalScore: 4.4
    },
    riskIndicators: {
      lightingRating: 4,
      crowdDensity: 5,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 4,
      theftRisk: "Moderate (Pickpocketing risk in crowds)",
      harassmentRisk: "Low",
      isolatedAreaRisk: "Low (stay within market boundaries)",
      walkScore: 94
    },
    safeHavenHubs: [
      { name: "Market Info & First Aid Kiosk", type: "Safe Station", distance: "Center of Square", icon: "🎪" },
      { name: "Central Police Station Precinct 5", type: "Police Station", distance: "280m away", icon: "👮" }
    ],
    communityTips: [
      {
        author: "Marcus D.",
        avatar: "🛡️",
        date: "5 days ago",
        comment: "Great tacos and music! Just keep your phone secure in deep pockets. Security was active and polite.",
        rating: 4.5
      }
    ]
  },
  {
    id: "loc-6",
    name: "Lumina Contemporary Art Space & Garden",
    category: "Art & Culture",
    neighborhood: "Gallery Row",
    address: "710 Canvas Way",
    coordinates: { lat: 40.74850, lng: -74.00200 },
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet & Safe", "Indoor & Courtyard", "Museum Security", "Well-Lit Parking"],
    safetyScore: 4.9,
    overallRating: 5,
    safeTimeWindows: {
      safest: "10:00 AM – 09:00 PM",
      caution: "09:00 PM – 11:00 PM",
      nightSafetyLevel: "High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "Safe at all operating hours; quiet street after 10 PM",
      peakCrowdHours: "01:00 PM – 06:00 PM"
    },
    genderSafety: {
      womenScore: 4.9,
      womenSummary: "Serene, cultured environment with museum docents and high-end security. Excellent for solo visits and low-pressure dates.",
      womenHighlights: [
        "🌸 Professional security guards in every gallery and courtyard",
        "🌸 Calm, respectful visitors and bright ambient lighting",
        "🌸 Clean, private restrooms with emergency alert pulls"
      ],
      menScore: 4.9,
      menSummary: "Extremely secure, peaceful venue with underground monitored parking.",
      menHighlights: [
        "🛡️ Zero crime incidents reported in 3+ years",
        "🛡️ Safe garage with direct elevator access"
      ],
      generalScore: 4.9
    },
    riskIndicators: {
      lightingRating: 5,
      crowdDensity: 3,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 3,
      theftRisk: "None",
      harassmentRisk: "None",
      isolatedAreaRisk: "None",
      walkScore: 96
    },
    safeHavenHubs: [
      { name: "Museum Guard Post & Front Desk", type: "Security", distance: "Main Entry", icon: "🏛️" },
      { name: "24/7 Well-Lit Valet Garage", type: "Safe Parking", distance: "Attached", icon: "🅿️" }
    ],
    communityTips: [
      {
        author: "Samantha B.",
        avatar: "🌸",
        date: "1 week ago",
        comment: "Such a calming place! Came here alone on a Friday evening, felt totally peaceful and safe.",
        rating: 5
      }
    ]
  },
  {
    id: "loc-7",
    name: "Cozy Page & Tea Independent Bookstore",
    category: "Bookstore & Tea",
    neighborhood: "Greenwich Village West",
    address: "95 Waverly Court",
    coordinates: { lat: 40.73350, lng: -73.99950 },
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    tags: ["Cozy Vibe", "Community Hub", "Late Night Reading", "Tea Bar"],
    safetyScore: 4.9,
    overallRating: 5,
    safeTimeWindows: {
      safest: "08:00 AM – 10:30 PM",
      caution: "10:30 PM – 12:00 AM",
      nightSafetyLevel: "High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "Safe stroll to subway until midnight",
      peakCrowdHours: "02:00 PM – 07:30 PM"
    },
    genderSafety: {
      womenScore: 5.0,
      womenSummary: "Beloved neighborhood sanctuary. Warm lighting, friendly book club community, right on a lively historic street.",
      womenHighlights: [
        "🌸 Community safe haven point (designated 'Ask for Angela' partner)",
        "🌸 Welcoming staff ready to assist any guest feeling uncomfortable",
        "🌸 Active foot traffic and outdoor bistro lights"
      ],
      menScore: 4.9,
      menSummary: "Wholesome, safe environment with zero street disturbance.",
      menHighlights: [
        "🛡️ Peaceful neighborhood with high residential vigilance",
        "🛡️ Zero reported vehicle vandalism or street scams"
      ],
      generalScore: 4.9
    },
    riskIndicators: {
      lightingRating: 5,
      crowdDensity: 3,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 3,
      theftRisk: "Very Low",
      harassmentRisk: "None",
      isolatedAreaRisk: "None",
      walkScore: 98
    },
    safeHavenHubs: [
      { name: "Village All-Night Pharmacy", type: "Safe Haven", distance: "80m away", icon: "💊" },
      { name: "W 4th St Subway Station", type: "Public Transit", distance: "140m away", icon: "🚇" }
    ],
    communityTips: [
      {
        author: "Hannah M.",
        avatar: "✨",
        date: "3 days ago",
        comment: "They literally have a sign saying 'If you need help or feel followed, tell any barista'. So reassuring!",
        rating: 5
      }
    ]
  },
  {
    id: "loc-8",
    name: "Velvet Moon Cinema & Speakeasy Mocktail Bar",
    category: "Entertainment & Cinema",
    neighborhood: "Cinema Row",
    address: "410 Marquee Boulevard",
    coordinates: { lat: 40.75400, lng: -73.98900 },
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    tags: ["Evening Entertainment", "Indoor Comfort", "Staff Escorts", "Pastel Mocktails"],
    safetyScore: 4.7,
    overallRating: 5,
    safeTimeWindows: {
      safest: "01:00 PM – 11:00 PM",
      caution: "11:00 PM – 01:30 AM (Use main illuminated lobby exit)",
      nightSafetyLevel: "High",
      daySafetyLevel: "Very High",
      recommendedDeparture: "Catch cabs from the main street marquee, avoid rear alleys",
      peakCrowdHours: "06:30 PM – 10:30 PM"
    },
    genderSafety: {
      womenScore: 4.7,
      womenSummary: "Very safe indie theater with 100% alcohol-free delicious mocktails, well-attended lobbies, and attentive ushers.",
      womenHighlights: [
        "🌸 Well-staffed theater halls with active ushers",
        "🌸 Bright marquee waiting area for rideshare pickups",
        "🌸 Zero alcohol-related aggression on premises"
      ],
      menScore: 4.7,
      menSummary: "Safe, mature crowd. Safe underground parking with ticket validation.",
      menHighlights: [
        "🛡️ Guarded parking lot with automated barriers",
        "🛡️ Respectful and calm crowd"
      ],
      generalScore: 4.7
    },
    riskIndicators: {
      lightingRating: 4,
      crowdDensity: 4,
      policePatrolFrequency: 4,
      emergencyResponseTimeMin: 3,
      theftRisk: "Low",
      harassmentRisk: "Very Low",
      isolatedAreaRisk: "Low (avoid back delivery lane after 11 PM)",
      walkScore: 95
    },
    safeHavenHubs: [
      { name: "Cinema Security & Lost & Found", type: "Security", distance: "Main Foyer", icon: "🎬" },
      { name: "24/7 Bright Diner next door", type: "Safe Haven", distance: "30m away", icon: "🥞" }
    ],
    communityTips: [
      {
        author: "Devon L.",
        avatar: "🌸",
        date: "6 days ago",
        comment: "Loved the mocktails! Super chill vibe, we stayed until the 10:45 PM movie finished and felt totally safe.",
        rating: 5
      }
    ]
  }
];

export const seedContacts = [
  {
    id: "contact-1",
    name: "Mom 💕",
    relationship: "Parent",
    phone: "+1 (555) 234-5678",
    email: "mom.safety@example.com",
    isPrimary: true,
    notifyOnStart: true,
    notifyOnDelay: true,
    avatar: "👩‍👧"
  },
  {
    id: "contact-2",
    name: "Sarah (Bestie) 🌸",
    relationship: "Best Friend",
    phone: "+1 (555) 876-5432",
    email: "sarah.b@example.com",
    isPrimary: true,
    notifyOnStart: true,
    notifyOnDelay: true,
    avatar: "💖"
  },
  {
    id: "contact-3",
    name: "James (Roommate) 🛡️",
    relationship: "Roommate",
    phone: "+1 (555) 345-6789",
    email: "james.r@example.com",
    isPrimary: false,
    notifyOnStart: false,
    notifyOnDelay: true,
    avatar: "🏠"
  }
];

export const seedHangouts = [
  {
    id: "hangout-1",
    locationId: "loc-1",
    locationName: "Bloom & Bean Botanical Cafe",
    category: "Cafe & Lounge",
    date: "2026-08-28",
    startTime: "16:00",
    endTime: "19:30",
    hangoutType: "Coffee with Friend 🌸",
    companionName: "Sarah K.",
    status: "planned", // planned, active, completed, cancelled
    checkInIntervalMinutes: 45,
    lastCheckIn: null,
    batteryAlertEnabled: true,
    shareLocationEnabled: true,
    selectedContactIds: ["contact-1", "contact-2"],
    notes: "Studying for midterm exam and catching up over iced lattes.",
    safetyRatingGiven: null,
    visited: false
  },
  {
    id: "hangout-2",
    locationId: "loc-4",
    locationName: "Pastel Moon Dessert & Boba Bar",
    category: "Dessert & Boba",
    date: "2026-08-20",
    startTime: "18:00",
    endTime: "20:30",
    hangoutType: "Solo Study & Boba ✨",
    companionName: "Solo",
    status: "completed",
    checkInIntervalMinutes: 30,
    lastCheckIn: "2026-08-20T20:15:00Z",
    batteryAlertEnabled: true,
    shareLocationEnabled: true,
    selectedContactIds: ["contact-1"],
    notes: "Everything felt super cozy and safe, street lights were fully lit.",
    safetyRatingGiven: 5,
    visited: true,
    visitReview: "Felt 100% safe, left at 8:30 PM with bright streets all the way to transit."
  },
  {
    id: "hangout-3",
    locationId: "loc-7",
    locationName: "Cozy Page & Tea Independent Bookstore",
    category: "Bookstore & Tea",
    date: "2026-08-14",
    startTime: "15:00",
    endTime: "17:45",
    hangoutType: "Book Club Meetup 📚",
    companionName: "Reading Club Group",
    status: "completed",
    checkInIntervalMinutes: 60,
    lastCheckIn: "2026-08-14T17:30:00Z",
    batteryAlertEnabled: true,
    shareLocationEnabled: true,
    selectedContactIds: ["contact-2"],
    notes: "Warm tea and great discussion. Area was lively with afternoon foot traffic.",
    safetyRatingGiven: 5,
    visited: true,
    visitReview: "Super safe and welcoming staff!"
  }
];

export const seedProfile = {
  id: "user-1",
  name: "Aria Sterling",
  email: "aria.sterling@safehaven.app",
  phone: "+1 (555) 901-2345",
  avatar: "🌸",
  preferredPerspective: "women", // 'women', 'men', 'all'
  safetyStreakDays: 14,
  safeHangoutsCompleted: 8,
  safetyScore: 98,
  badges: [
    {
      id: "badge-1",
      name: "Safe Explorer 🌸",
      description: "Planned and safely completed 5+ verified safe hangouts",
      icon: "🌟",
      unlockedAt: "2026-08-15"
    },
    {
      id: "badge-2",
      name: "Check-in Champion ✨",
      description: "Always checked in on time during every outing",
      icon: "⏰",
      unlockedAt: "2026-08-20"
    },
    {
      id: "badge-3",
      name: "Night Owl Shield 🛡️",
      description: "Safely navigated evening hangouts using safe time windows",
      icon: "🌙",
      unlockedAt: "2026-08-22"
    },
    {
      id: "badge-4",
      name: "Community Guardian 💖",
      description: "Contributed safety reviews and tips to help others",
      icon: "🤝",
      unlockedAt: "2026-08-24"
    }
  ],
  emergencyPreferences: {
    fakeCallDelaySec: 5,
    defaultFakeCaller: "Mom 💕",
    smsAutoTriggerOnSOS: true,
    sirenVolume: "Loud",
    vibrationEnabled: true
  }
};
