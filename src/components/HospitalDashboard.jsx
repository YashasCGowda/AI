import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

function HospitalDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState('hospital-a');

  const fetchHospitalData = async (retryCount = 3, delay = 1000) => {
    for (let i = 0; i < retryCount; i++) {
      try {
        console.log('Fetching hospital resources with hospital:', hospital, 'Attempt:', i + 1);
        const response = await axios.get('/api/hospital-resources', {
          params: { hospital }
        });
        console.log('Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching hospital data (attempt ' + (i + 1) + '):', error);
        if (i < retryCount - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        throw error;
      }
    }
  };

  const handleRefresh = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const responseData = await fetchHospitalData();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        setData({ error: 'Failed to fetch hospital data. Please try again.' });
      } finally {
        setLoading(false);
      }
    }, 1000),
    [hospital]
  );

  useEffect(() => {
    console.log('useEffect triggered with hospital:', hospital);
    handleRefresh();
    return () => {
      handleRefresh.cancel();
    };
  }, [hospital, handleRefresh]);

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Hospital Dashboard</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className='max-w-md mx-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Hospital Resource Dashboard</h2>
              <button
                onClick={handleRefresh}
                className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-300'
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <div className='mb-4'>
              <label className='block mb-1'>Select Hospital:</label>
              <select
                value={hospital}
                onChange={(e) => {
                  console.log('Hospital changed to:', e.target.value);
                  setHospital(e.target.value);
                }}
                className='p-2 border rounded-md'
              >
                <option value='hospital-a'>Hospital A</option>
                <option value='hospital-b'>Hospital B</option>
              </select>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
              <div className='bg-white p-4 rounded-md shadow'>
                {data.error ? (
                  <p>{data.error}</p>
                ) : (
                  <>
                    <p>Beds Available: {data.beds_available}</p>
                    <p>Predicted Need: {data.predicted_need}</p>
                  </>
                )}
              </div>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default HospitalDashboard;