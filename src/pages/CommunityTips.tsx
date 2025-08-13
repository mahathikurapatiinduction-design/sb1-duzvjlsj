import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Users, 
  CheckCircle, 
  Award, 
  TrendingUp, 
  Calendar,
  Star
} from 'lucide-react';
import { mockApi, WaterTip } from '../api/mockApi';

export function CommunityTips() {
  const [tips, setTips] = useState<WaterTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptedChallenges, setAcceptedChallenges] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await mockApi.getTips();
        setTips(data);
      } catch (error) {
        console.error('Error fetching tips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleAcceptChallenge = (tipId: string) => {
    setAcceptedChallenges(prev => new Set(prev.add(tipId)));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '🟢';
      case 'Medium':
        return '🟡';
      case 'Hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Tips & Challenges</h1>
        <p className="text-gray-600 mt-2">Learn from the community and take on water-saving challenges</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Tips</p>
              <p className="text-2xl font-bold text-gray-900">{tips.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Challenges</p>
              <p className="text-2xl font-bold text-gray-900">{acceptedChallenges.size}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Community Members</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">{acceptedChallenges.size * 2}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tips.map((tip) => {
          const isAccepted = acceptedChallenges.has(tip.id);
          
          return (
            <div
              key={tip.id}
              className={`bg-white rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                isAccepted ? 'border-green-200 bg-gradient-to-r from-green-50 to-teal-50' : 'border-gray-100'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(tip.difficulty)}`}>
                    <span className="mr-1">{getDifficultyIcon(tip.difficulty)}</span>
                    {tip.difficulty}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{tip.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Impact: {tip.impact}</span>
                  </div>
                </div>

                {isAccepted ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Challenge Accepted!</span>
                    </div>
                    <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <Award className="h-4 w-4" />
                      <span>Badge Earned</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAcceptChallenge(tip.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
                  >
                    Accept Challenge
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Challenge Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-4 rounded-full">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Weekly Community Challenge</h2>
          <p className="text-gray-600 mb-4">
            Join 1,234 community members in this week's challenge
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🚿 "5-Minute Shower Challenge"
            </h3>
            <p className="text-gray-600 mb-4">
              Keep all your showers under 5 minutes for the entire week. Track your progress and compete with friends!
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg text-purple-600">7</div>
                <div>Days Left</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-purple-600">1,234</div>
                <div>Participants</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-purple-600">Save 500L</div>
                <div>Potential Savings</div>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium">
              Join Weekly Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}