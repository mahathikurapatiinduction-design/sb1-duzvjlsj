# Water Dashboard - Full Stack

## Setup

1. Create a `.env` file in the project root with:

```
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Firebase (Vite reads VITE_*)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXX
```

2. Install dependencies:

```
npm install
```

3. Run dev servers (web on 5173, API on 8787):

```
npm run dev
```

## Features
- Firebase Auth (email+password)
- Firestore persistence for usage submissions, tips, leaderboard, and goal settings
- Protected routes
- AI Chat Assistant powered by OpenAI via `/api/chat`

## Firestore Collections
- `users/{uid}`: { uid, email, createdAt }
- `usage`: { month: string, year: number, usage: number }
- `usageSubmissions`: { month: number, year: number, usage: number, notes: string, createdAt }
- `leaderboard`: { name: string, usage: number, city: string }
- `tips`: { title, description, impact, difficulty }