import React, { useState } from 'react';
import axios from 'axios';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/symptom-check', { symptoms });
      setResult(response.data);
    } catch (error) {
      console.error('Error checking symptoms:', error);
      setResult({ error: 'Failed to check symptoms. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Symptom Checker</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Symptom Checker</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>Enter your symptoms:</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className='w-full p-2 border rounded-lg'
                  rows='4'
                  placeholder='e.g., I have a fever and a sore throat...'
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Symptoms'}
              </button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-white rounded-md shadow">
                <p>{result.error || `Possible Conditions: ${result.conditions?.join(', ') || 'None'}`}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default SymptomChecker;