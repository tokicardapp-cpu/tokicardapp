import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './components/LandingPage';
import { WaitlistForm } from './components/WaitlistForm';
import { ThankYouPage } from './components/ThankYouPage';

type AppState = 'landing' | 'waitlist' | 'submitting' | 'thankyou';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  const handleJoinWaitlist = () => {
    setAppState('waitlist');
  };

  const handleSubmissionStart = () => {
    setAppState('submitting');
  };

  const handleSubmissionComplete = () => {
    setAppState('thankyou');
  };

  return (
    <>
      {appState === 'landing' && (
        <LandingPage onJoinWaitlist={handleJoinWaitlist} />
      )}

      {appState === 'waitlist' && (
        <WaitlistForm 
          onSuccess={handleSubmissionComplete}
          onLoadingStart={handleSubmissionStart}
        />
      )}

      {appState === 'submitting' && (
        <WaitlistForm 
          onSuccess={handleSubmissionComplete}
          onLoadingStart={handleSubmissionStart}
        />
      )}

      {appState === 'thankyou' && <ThankYouPage />}

      <Toaster position="top-center" richColors />
    </>
  );
}
