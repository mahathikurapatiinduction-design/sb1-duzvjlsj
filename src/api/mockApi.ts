// Mock API functions for demonstration
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface UsageData {
  month: string;
  usage: number;
  year: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  usage: number;
  city: string;
  rank: number;
}

export interface WaterTip {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const mockApi = {
  // Get usage data for charts
  getUsageData: async (): Promise<UsageData[]> => {
    // Expecting documents in collection `usage` with fields: month (string e.g. 'Jul'), usage (number), year (number)
    const snapshot = await getDocs(collection(db, 'usage'));
    const rows: UsageData[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as any;
      if (typeof data?.month === 'string' && typeof data?.usage === 'number' && typeof data?.year === 'number') {
        rows.push({ month: data.month, usage: data.usage, year: data.year });
      }
    });
    // Basic fallback if empty to avoid breaking charts
    if (rows.length === 0) {
      return [
        { month: 'Jul', usage: 1200, year: 2024 },
        { month: 'Aug', usage: 1350, year: 2024 },
        { month: 'Sep', usage: 1100, year: 2024 },
        { month: 'Oct', usage: 1250, year: 2024 },
        { month: 'Nov', usage: 1400, year: 2024 },
        { month: 'Dec', usage: 1300, year: 2024 },
      ];
    }
    return rows;
  },

  // Get leaderboard data
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    // Expecting documents in `leaderboard` with fields: name (string), usage (number), city (string)
    // We will compute rank client-side
    const q = query(collection(db, 'leaderboard'));
    const snapshot = await getDocs(q);
    const list: Omit<LeaderboardEntry, 'rank'>[] = [] as any;
    snapshot.forEach((d) => {
      const data = d.data() as any;
      if (typeof data?.name === 'string' && typeof data?.usage === 'number' && typeof data?.city === 'string') {
        list.push({ id: d.id, name: data.name, usage: data.usage, city: data.city } as any);
      }
    });
    const sorted = list.sort((a, b) => a.usage - b.usage);
    const ranked: LeaderboardEntry[] = sorted.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
    if (ranked.length === 0) {
      return [
        { id: '1', name: 'Sarah Chen', usage: 800, city: 'San Francisco', rank: 1 },
        { id: '2', name: 'Mike Johnson', usage: 850, city: 'San Francisco', rank: 2 },
        { id: '3', name: 'Emily Davis', usage: 900, city: 'San Francisco', rank: 3 },
        { id: '4', name: 'You', usage: 1100, city: 'San Francisco', rank: 4 },
        { id: '5', name: 'Alex Wilson', usage: 1150, city: 'San Francisco', rank: 5 },
        { id: '6', name: 'Lisa Brown', usage: 1200, city: 'San Francisco', rank: 6 },
        { id: '7', name: 'Tom Anderson', usage: 1250, city: 'San Francisco', rank: 7 },
        { id: '8', name: 'Jessica Lee', usage: 1300, city: 'San Francisco', rank: 8 },
        { id: '9', name: 'David Kim', usage: 1350, city: 'San Francisco', rank: 9 },
        { id: '10', name: 'Rachel Green', usage: 1400, city: 'San Francisco', rank: 10 },
      ];
    }
    return ranked;
  },

  // Get water saving tips
  getTips: async (): Promise<WaterTip[]> => {
    // Expecting docs in `tips` with fields title, description, impact, difficulty
    const snapshot = await getDocs(collection(db, 'tips'));
    const rows: WaterTip[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as any;
      if (data?.title) {
        rows.push({ id: d.id, title: data.title, description: data.description, impact: data.impact, difficulty: data.difficulty });
      }
    });
    if (rows.length === 0) {
      return [
        {
          id: '1',
          title: 'Fix Leaky Faucets',
          description: 'A dripping faucet can waste over 3,000 gallons per year',
          impact: 'Save up to 300L/month',
          difficulty: 'Easy'
        },
        {
          id: '2',
          title: 'Install Low-Flow Showerheads',
          description: 'Reduce shower water usage by up to 40%',
          impact: 'Save up to 150L/month',
          difficulty: 'Medium'
        },
        {
          id: '3',
          title: 'Collect Rainwater',
          description: 'Use collected rainwater for garden irrigation',
          impact: 'Save up to 200L/month',
          difficulty: 'Hard'
        },
        {
          id: '4',
          title: 'Shorter Showers',
          description: 'Reduce shower time to 4 minutes or less',
          impact: 'Save up to 100L/month',
          difficulty: 'Easy'
        },
        {
          id: '5',
          title: 'Efficient Dishwashing',
          description: 'Run dishwasher only when full and use eco-mode',
          impact: 'Save up to 80L/month',
          difficulty: 'Easy'
        },
      ];
    }
    return rows;
  },

  // Submit usage data
  submitUsage: async (data: Omit<UsageData, 'month'> & { month: number, notes?: string }): Promise<void> => {
    // We will store in `usageSubmissions` collection
    const payload = {
      month: data.month,
      year: data.year,
      usage: data.usage,
      notes: data.notes || '',
      createdAt: Date.now()
    };
    await addDoc(collection(db, 'usageSubmissions'), payload);
  },

  // OCR for bill processing (mock)
  processBill: async (file: File): Promise<{ usage: number; month: string; year: number }> => {
    // In a real app, send to backend for OCR. Here we return a deterministic pseudo-random value based on file size
    const usage = Math.min(1800, 800 + (file.size % 1000));
    return {
      usage,
      month: 'December',
      year: new Date().getFullYear()
    };
  },

  // Save user goal
  saveGoal: async (goal: number): Promise<void> => {
    // Persist a singleton document `settings/goal`
    await setDoc(doc(db, 'settings', 'goal'), { value: goal, updatedAt: Date.now() });
    localStorage.setItem('waterGoal', goal.toString());
  },

  // Get user goal
  getGoal: async (): Promise<number> => {
    try {
      const snap = await getDoc(doc(db, 'settings', 'goal'));
      if (snap.exists()) {
        const data = snap.data() as any;
        if (typeof data?.value === 'number') return data.value;
      }
    } catch {}
    return parseInt(localStorage.getItem('waterGoal') || '1500');
  }
};