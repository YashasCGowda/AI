import React, { useState } from 'react';
import axios from 'axios';

function MedicationChecker() {
  const [medications, setMedications] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!medications.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/medication-check', {
        medications: medications.split(',').map(m => m.trim()),
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error checking medications:', error);
      setResult({ error: 'Failed to check medications. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Medication Checker</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Medication Interaction Checker</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter medications (e.g., aspirin, ibuprofen)"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Checking...' : 'Check Interactions'}
              </button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-white rounded-md shadow">
                <p>{result.error || `Interactions: ${result.interactions?.join(', ') || 'None'}`}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MedicationChecker;