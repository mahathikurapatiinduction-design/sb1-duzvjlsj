import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, MapPin, Droplets, TrendingDown } from 'lucide-react';
import { mockApi, LeaderboardEntry } from '../api/mockApi';

export function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await mockApi.getLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600">{rank}</span>
          </div>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'from-amber-50 to-amber-100 border-amber-200';
      default:
        return 'from-white to-gray-50 border-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentUser = leaderboardData.find(entry => entry.name === 'You');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Leaderboard</h1>
        <p className="text-gray-600 mt-2">See how you stack up against other water conservation champions in your city</p>
      </div>

      {/* Current User Stats */}
      {currentUser && (
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">Your Ranking in San Francisco</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">#{currentUser.rank}</div>
                <div className="text-sm text-blue-700">Current Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{currentUser.usage.toLocaleString()}L</div>
                <div className="text-sm text-blue-700">Monthly Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(((leaderboardData[0]?.usage || 0) / currentUser.usage) * 100)}%
                </div>
                <div className="text-sm text-blue-700">vs Top Performer</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Top Water Savers</h2>
          </div>
          <p className="text-blue-100 text-sm mt-1">Ranked by lowest water usage per capita this month</p>
        </div>

        <div className="divide-y divide-gray-200">
          {leaderboardData.map((entry, index) => (
            <div
              key={entry.id}
              className={`px-6 py-4 bg-gradient-to-r ${
                entry.name === 'You' 
                  ? 'from-green-50 to-teal-50 border-l-4 border-green-400' 
                  : getRankColor(entry.rank)
              } transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getRankIcon(entry.rank)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${
                        entry.name === 'You' ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {entry.name}
                        {entry.name === 'You' && (
                          <span className="ml-2 px-2 py-1 text-xs bg-green-200 text-green-800 rounded-full">
                            You
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{entry.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold text-gray-900">
                        {entry.usage.toLocaleString()}L
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">this month</div>
                  </div>

                  {entry.rank <= 3 && (
                    <div className="hidden sm:block">
                      {entry.rank === 1 && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          <TrendingDown className="h-3 w-3" />
                          <span>Champion</span>
                        </div>
                      )}
                      {entry.rank === 2 && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          <TrendingDown className="h-3 w-3" />
                          <span>Runner-up</span>
                        </div>
                      )}
                      {entry.rank === 3 && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          <TrendingDown className="h-3 w-3" />
                          <span>3rd Place</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenge Section */}
      <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Join the Challenge!</h3>
          <p className="text-gray-600 text-sm mb-4">
            Can you make it to the top 3? Start implementing water-saving measures today!
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="text-lg font-bold text-teal-600">
                {leaderboardData.length - (currentUser?.rank || 0)}
              </div>
              <div className="text-xs text-gray-600">users behind you</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <div className="text-lg font-bold text-blue-600">
                {(currentUser?.rank || 1) - 1}
              </div>
              <div className="text-xs text-gray-600">users ahead</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}