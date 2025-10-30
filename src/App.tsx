import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './components/LandingPage';
import { WaitlistForm } from './components/WaitlistForm';
import { ThankYouPage } from './components/ThankYouPage';

type AppState = 'landing' | 'waitlist' | 'submitting' | 'thankyou';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userName, setUserName] = useState('');

  const handleJoinWaitlist = () => {
    setAppState('waitlist');
  };

  const handleSubmissionStart = () => {
    setAppState('submitting');
  };

  const handleSubmissionComplete = (name: string) => {
    setUserName(name);
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

      {appState === 'thankyou' && <ThankYouPage userName={userName} />}

      <Toaster position="top-center" richColors />
    </>
  );
}
