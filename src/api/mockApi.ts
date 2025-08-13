// Mock API functions for demonstration
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
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return [
      { month: 'Jul', usage: 1200, year: 2024 },
      { month: 'Aug', usage: 1350, year: 2024 },
      { month: 'Sep', usage: 1100, year: 2024 },
      { month: 'Oct', usage: 1250, year: 2024 },
      { month: 'Nov', usage: 1400, year: 2024 },
      { month: 'Dec', usage: 1300, year: 2024 },
    ];
  },

  // Get leaderboard data
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
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
  },

  // Get water saving tips
  getTips: async (): Promise<WaterTip[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
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
  },

  // Submit usage data
  submitUsage: async (data: Omit<UsageData, 'month'> & { month: number, notes?: string }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Submitted usage data:', data);
  },

  // OCR for bill processing (mock)
  processBill: async (file: File): Promise<{ usage: number; month: string; year: number }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      usage: Math.floor(Math.random() * 500) + 800,
      month: 'December',
      year: 2024
    };
  },

  // Save user goal
  saveGoal: async (goal: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem('waterGoal', goal.toString());
  },

  // Get user goal
  getGoal: async (): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return parseInt(localStorage.getItem('waterGoal') || '1500');
  }
};