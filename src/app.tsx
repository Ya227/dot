import React, { useEffect, useState } from 'react';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';

const routes: Record<string, React.ComponentType> = {
  '/dot': Landing,
  '/dot/dashboard': Dashboard,
};

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener('popstate', updatePath);

    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  const normalizedPath = path.replace(/\/+$/, '') || '/';
  const Page = routes[normalizedPath] ?? Landing;

  return <Page />;
};

export default App;