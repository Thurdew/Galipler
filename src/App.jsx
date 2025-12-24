import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <main className="pt-28">
        <HomePage />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
