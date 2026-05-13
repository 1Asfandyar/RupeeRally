import OnboardingView from '../components/OnboardingView';
import { useOnboardingFlow } from '../hooks/useOnboardingFlow';

const OnboardingWelcomeScreen = () => {
  const flow = useOnboardingFlow();

  return <OnboardingView flow={flow} />;
};

export default OnboardingWelcomeScreen;
