import React, { useState, useEffect } from 'react';
import { Target, Award, TrendingUp, Save, Edit } from 'lucide-react';
import { mockApi } from '../api/mockApi';

export function Goals() {
  const [currentGoal, setCurrentGoal] = useState(1500);
  const [newGoal, setNewGoal] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentUsage] = useState(1300); // Mock current usage

  // Mock badges data
  const badges = [
    { id: 1, name: 'Water Saver', description: 'Used less than goal for 3 months', earned: true, icon: '💧' },
    { id: 2, name: 'Eco Warrior', description: 'Reduced usage by 20% from last year', earned: true, icon: '🌱' },
    { id: 3, name: 'Conservation Champion', description: 'Met goals for 6 consecutive months', earned: false, icon: '🏆' },
    { id: 4, name: 'Efficiency Expert', description: 'Maintained low usage for 12 months', earned: false, icon: '⚡' },
  ];

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await mockApi.getGoal();
        setCurrentGoal(goal);
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();
  }, []);

  const handleSaveGoal = async () => {
    if (!newGoal || parseInt(newGoal) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid goal amount.' });
      return;
    }

    setLoading(true);
    try {
      await mockApi.saveGoal(parseInt(newGoal));
      setCurrentGoal(parseInt(newGoal));
      setNewGoal('');
      setEditing(false);
      setMessage({ type: 'success', text: 'Goal updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update goal. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (currentUsage / currentGoal) * 100;
  const remainingUsage = Math.max(0, currentGoal - currentUsage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Water Conservation Goals</h1>
        <p className="text-gray-600 mt-2">Set and track your water usage goals to promote sustainability</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Goal Setting */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Monthly Goal</h2>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                    New Monthly Goal (Liters)
                  </label>
                  <input
                    type="number"
                    id="goal"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder={currentGoal.toString()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveGoal}
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{loading ? 'Saving...' : 'Save Goal'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setNewGoal('');
                      setMessage({ type: '', text: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {currentGoal.toLocaleString()}L
                </div>
                <p className="text-gray-600">Monthly Water Usage Goal</p>
              </div>
            )}
          </div>

          {/* Progress Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Progress This Month</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-gray-600">of monthly goal reached</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-6">
                <div 
                  className={`h-6 rounded-full transition-all duration-300 ${
                    progressPercentage <= 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentUsage.toLocaleString()}L
                  </div>
                  <div className="text-sm text-gray-600">Used This Month</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {remainingUsage.toLocaleString()}L
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>

              {progressPercentage <= 80 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">🎉 Great job!</p>
                  <p className="text-green-700 text-sm mt-1">
                    You're well on track to meet your monthly goal. Keep up the excellent conservation work!
                  </p>
                </div>
              )}

              {progressPercentage > 100 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-semibold">⚠️ Goal Exceeded</p>
                  <p className="text-red-700 text-sm mt-1">
                    You've exceeded your monthly goal. Consider reviewing your usage and implementing water-saving measures.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900">Achievement Badges</h2>
            </div>

            <div className="space-y-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    badge.earned
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${badge.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {badge.name}
                      </h3>
                      <p className={`text-sm ${badge.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <div className="text-yellow-500">
                        <Award className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {badges.filter(b => b.earned).length} of {badges.length} badges earned
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${(badges.filter(b => b.earned).length / badges.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}