import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App" data-version="1.0.1">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
