import React, { useState } from 'react';
import SymptomChecker from './components/SymptomChecker';
import MedicalImaging from './components/MedicalImaging';
import MedicationChecker from './components/MedicationChecker';
import MentalHealthChatbot from './components/MentalHealthChatbot';
import HospitalDashboard from './components/HospitalDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('symptom');

  const tabs = [
    { id: 'symptom', name: 'Symptom Checker' },
    { id: 'imaging', name: 'Medical Imaging' },
    { id: 'medication', name: 'Medication Checker' },
    { id: 'chatbot', name: 'Mental Health Chatbot' },
    { id: 'hospital', name: 'Hospital Resources' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">AI Healthcare Assistant</h1>
      </header>
      <nav className="bg-white shadow">
        <ul className="flex space-x-4 p-4">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="p-4">
        {activeTab === 'symptom' && <SymptomChecker />}
        {activeTab === 'imaging' && <MedicalImaging />}
        {activeTab === 'medication' && <MedicationChecker />}
        {activeTab === 'chatbot' && <MentalHealthChatbot />}
        {activeTab === 'hospital' && <HospitalDashboard />}
      </main>
    </div>
  );
}

export default App;