import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage'; // HomePage dosyanın konumuna göre bu yolu ayarla
import Footer from './components/Footer'; // Eğer varsa footer
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <div>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer /> {/* Footer bileşenin varsa ekle */}
      <ScrollToTopButton/>
    </div>
  );
}

export default App;
