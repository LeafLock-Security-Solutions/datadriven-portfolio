import './App.css';
import { useEffect, useState } from 'react';

import { Layout } from './components/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { loadSource } from './source/validate';

/**
 * Main application component.
 * Renders the portfolio within the Layout, or ErrorPage if source loading fails.
 *
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  const [source, setSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSource().then(data => {
      setSource(data);
      setIsLoading(false);
    });
  }, []);

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <ErrorPage source={source} />
    </Layout>
  );
}

export default App;
