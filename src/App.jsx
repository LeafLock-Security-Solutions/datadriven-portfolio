import './App.css';
import { Layout } from './components/Layout';
import { AppStateProvider } from './context/AppStateProvider';
import { useAppState } from './hooks/useAppState';
import { ErrorPage } from './pages/ErrorPage';

/**
 * Main application component.
 * Wraps the app in AppStateProvider for global state access.
 *
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}

/**
 * Inner app component that consumes the app state context.
 * Renders Portfolio or ErrorPage based on profile loading status.
 *
 * @returns {JSX.Element|null} The rendered content
 */
function AppContent() {
  const { envConfig, isLoading, profile } = useAppState();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      {profile ? <div>Portfolio loaded - {profile.name}</div> : <ErrorPage envConfig={envConfig} />}
    </Layout>
  );
}

export default App;
