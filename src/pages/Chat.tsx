import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hi! I am your water conservation assistant. Ask me anything about your usage, goals, and tips to save more water.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newMessages = [...messages, { role: 'user', content: input.trim() } as ChatMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      const reply = (data && data.reply) || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600 text-sm">Personalized tips and guidance for your water-saving journey</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${
                m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  {m.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="font-medium">{m.role === 'user' ? 'You' : 'Assistant'}</span>
                </div>
                <div>{m.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm bg-gray-100 text-gray-900">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="font-medium">Assistant</span>
                </div>
                <div>Thinking…</div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="px-4 py-2 text-sm text-red-700 bg-red-50 border-t border-red-200">{error}</div>
        )}

        <div className="p-4 border-t border-gray-200 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for tips, insights, or help setting goals…"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-teal-700"
          >
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Send</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}