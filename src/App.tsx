import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './components/LandingPage';
import { WaitlistForm } from './components/Waitlist';
import { ThankYouPage } from './components/ThankYouPage';
import { ReferralLookupPage } from './components/referral';
import { useState } from 'react';

function AppRoutes() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // These replace your old handle functions 👇
  const handleJoinWaitlist = () => navigate('/waitlist');
  const handleReferralLookup = () => navigate('/referrallookup');

  const handleSubmissionStart = () => {
    // optional loading state logic if needed
  };

  const handleSubmissionComplete = (name: string) => {
    setUserName(name);
    navigate('/thankyou'); // 🚀 same behavior as before, just navigates now
  };

  return (
    <>
      <Routes>
        {/* Landing page */}
        <Route
          path="/"
          element={
            <LandingPage
              onJoinWaitlist={handleJoinWaitlist}
            />
          }
        />

        {/* Waitlist form */}
        <Route
          path="/waitlist"
          element={
            <WaitlistForm
              onSuccess={handleSubmissionComplete}
              onLoadingStart={handleSubmissionStart}
            />
          }
        />

        {/* Thank-you page */}
        <Route
          path="/thankyou"
          element={<ThankYouPage userName={userName} />}
        />

        {/* Referral lookup page */}
        <Route path="/referral" element={<ReferralLookupPage />} />
      </Routes>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
