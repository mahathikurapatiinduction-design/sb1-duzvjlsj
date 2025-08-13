import React from 'react';
import { Droplets } from 'lucide-react';

export function Footer() {
  const quotes = [
    "Water is life's matter and matrix, mother and medium. There is no life without water.",
    "A drop of water is worth more than a sack of gold to a thirsty man.",
    "When the well is dry, we know the worth of water.",
    "Water is the driving force in nature."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="bg-gradient-to-r from-blue-50 to-teal-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Droplets className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Every Drop Counts</h3>
          </div>
          <p className="text-gray-600 italic max-w-2xl mx-auto text-sm">
            "{randomQuote}"
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © 2024 Water Usage Dashboard. Built for Sustainability Hackathon.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}