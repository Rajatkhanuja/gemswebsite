// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GemDetail from "./pages/GemDetail";
import ServiceDetail from "./pages/ServiceDetail";
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <ScrollToTop /> {/* Add ScrollToTop component here */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
           <Route path="/shop/:id" element={<GemDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;
