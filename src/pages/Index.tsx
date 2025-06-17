
import { useBoschSmartHome } from '@/hooks/useBoschSmartHome';
import { AuthCard } from '@/components/bosch/AuthCard';
import { Dashboard } from '@/components/bosch/Dashboard';

const Index = () => {
  const { isAuthenticated, authenticate, isAuthenticating } = useBoschSmartHome();

  if (!isAuthenticated) {
    return (
      <AuthCard
        onAuthenticate={authenticate}
        isAuthenticating={isAuthenticating}
      />
    );
  }

  return <Dashboard />;
};

export default Index;
