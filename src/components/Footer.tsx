import React from 'react';
import { Droplets, MessageCircle } from 'lucide-react';

export function Footer() {
  const quotes = [
    "Water is life's matter and matrix, mother and medium. There is no life without water.",
    "A drop of water is worth more than a sack of gold to a thirsty man.",
    "When the well is dry, we know the worth of water.",
    "Water is the driving force in nature."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Water Dashboard</p>
        <a
          href="#/chat"
          title="Open AI Assistant"
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Ask AI</span>
        </a>
      </div>
    </footer>
  );
}