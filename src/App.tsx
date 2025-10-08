import { Suspense } from 'react';
import Dashboard from './pages/Dashboard.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './App.css';

function App() {
  return (
    <main>
      <ErrorBoundary
        fallback={
          <div>
            <p>Etwas ist schiefgelaufen.</p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div>
              <p>Posts werden geladen...</p>
            </div>
          }
        >
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default App;
