import React, { useState } from 'react';
import axios from 'axios';

function MedicalImaging() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check if the file has an extension
      const hasExtension = selectedFile.name.includes('.');
      if (!hasExtension) {
        setError('Please select a file with an extension (e.g., filename.jpg, filename.pdf).');
        setFile(null);
        setResult(null);
        return;
      }
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/image-analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data);
      setResult(response.data);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to analyze the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Medical Imaging</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Medical File Analysis</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload File:</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Analyze File'}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md shadow">
                <p>{error}</p>
              </div>
            )}
            {result && (
              <div className="mt-4 p-4 bg-white rounded-md shadow">
                {result.error ? (
                  <p><strong>Error:</strong> {result.error}</p>
                ) : (
                  <>
                    <p><strong>Diagnosis:</strong> {result.diagnosis || 'No diagnosis available'}</p>
                    <p>
                      <strong>Average Brightness:</strong>{' '}
                      {typeof result.average_brightness === 'number'
                        ? result.average_brightness.toFixed(2)
                        : 'Not available'}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MedicalImaging;