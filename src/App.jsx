import './App.css';
import { Layout } from './components/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { source } from './source/validate';

/**
 * Main application component.
 * Renders the portfolio within the Layout, or ErrorPage if source loading fails.
 *
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  return (
    <Layout>
      <ErrorPage source={source} />
    </Layout>
  );
}

export default App;
