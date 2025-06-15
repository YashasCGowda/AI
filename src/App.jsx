import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HospitalDashboard from './components/HospitalDashboard';
import SymptomChecker from './components/SymptomChecker';
import MedicalImaging from './components/MedicalImaging';
import MedicationChecker from './components/MedicationChecker';
import MentalHealthChatbox from './components/MentalHealthChatbox';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/resources" />} />
        <Route path="/resources" element={<HospitalDashboard />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/medical-imaging" element={<MedicalImaging />} />
        <Route path="/medication-checker" element={<MedicationChecker />} />
        <Route path="/mental-health-chatbox" element={<MentalHealthChatbox />} />
      </Routes>
    </div>
  );
}

export default App;