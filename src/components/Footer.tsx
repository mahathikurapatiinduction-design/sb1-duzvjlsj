import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Water Dashboard</p>
        <Link
          to="/chat"
          title="Open AI Assistant"
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Ask AI</span>
        </Link>
      </div>
    </footer>
  );
}