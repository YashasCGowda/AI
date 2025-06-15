import React, { useState } from 'react';
import axios from 'axios';

function MentalHealthChatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setLoading(true);
    try {
      const response = await axios.post('/api/chatbot', { message: input });
      setMessages([...messages, userMessage, { sender: 'bot', text: response.data.response }]);
    } catch (error) {
      console.error('Error with chatbot:', error);
      setMessages([...messages, userMessage, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
    setInput('');
  };

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Mental Health Chatbox</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Mental Health Chatbox</h2>
            <div className="h-64 overflow-y-auto bg-white p-4 rounded-md shadow mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default MentalHealthChatbox;