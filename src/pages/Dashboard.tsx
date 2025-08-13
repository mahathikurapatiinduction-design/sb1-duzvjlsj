import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Droplets, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Award,
  Calendar
} from 'lucide-react';
import { mockApi, UsageData } from '../api/mockApi';

export function Dashboard() {
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUsage] = useState(1300); // Current month usage
  const [monthlyGoal, setMonthlyGoal] = useState(1500);

  const waterTips = [
    "Take shorter showers to save up to 150 gallons per week",
    "Fix leaky faucets immediately - they can waste 3,000+ gallons per year",
    "Only run dishwashers and washing machines with full loads"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usage, goal] = await Promise.all([
          mockApi.getUsageData(),
          mockApi.getGoal()
        ]);
        setUsageData(usage);
        setMonthlyGoal(goal);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const progressPercentage = (currentUsage / monthlyGoal) * 100;
  const predictedNextMonth = Math.round(currentUsage * 1.1); // Simple prediction logic

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Water Usage Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your water consumption and achieve sustainability goals</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{currentUsage.toLocaleString()}L</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Goal</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyGoal.toLocaleString()}L</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Predicted Next Month</p>
              <p className="text-2xl font-bold text-gray-900">{predictedNextMonth.toLocaleString()}L</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Goal Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Usage Trends</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Goal Progress</h3>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}% of goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-300 ${
                  progressPercentage <= 100 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0L</span>
              <span>{monthlyGoal.toLocaleString()}L</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Water Saving Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Water Saving Tips</h3>
            </div>
            <div className="space-y-3">
              {waterTips.map((tip, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Forecast Widget */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Forecast</h3>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Next Month Prediction</p>
              <p className="text-3xl font-bold text-gray-900">{predictedNextMonth.toLocaleString()}L</p>
              <p className="text-sm text-gray-500 mt-2">
                Based on current trends
              </p>
            </div>
          </div>

          {/* Achievement Badge */}
          {progressPercentage <= 100 && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6 border border-green-200">
              <div className="text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-green-800">Goal Achievement!</h3>
                <p className="text-sm text-green-600 mt-1">
                  You're on track to meet your monthly goal!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}