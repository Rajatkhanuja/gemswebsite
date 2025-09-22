import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactInfo from "./components/ContactInfo";
import AddGems from "./components/Addgems";
import ViewGems from "./components/Viewgems";
import UpdateGem from "./components/UpdateGem"; 
import Updateastrology from "./components/Updateastrology"; 
import Viewastrology from "./components/Viewastrology"; // ✅ Import ViewAstrology
import UpdateView from "./components/Updateview"; // ✅ Import UpdateView
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component

function App() {
  return (
    <Router>
       <ScrollToTop /> {/* Add ScrollToTop component here */}
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* Login Page */}
        <Route path="/admin/login" element={<Login />} />

        {/* Dashboard Page */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Contact Info Page */}
        <Route
          path="/admin/contact-info"
          element={
            <ProtectedRoute>
              <ContactInfo />
            </ProtectedRoute>
          }
        />

        {/* Add Gems Page */}
        <Route
          path="/admin/add-gems"
          element={
            <ProtectedRoute>
              <AddGems />
            </ProtectedRoute>
          }
        />

        {/* View & Update Gems Page */}
        <Route
          path="/admin/view-gems"
          element={
            <ProtectedRoute>
              <ViewGems />
            </ProtectedRoute>
          }
        />

        {/* Update Gem Page */}
        <Route
          path="/admin/update-gem/:id"
          element={
            <ProtectedRoute>
              <UpdateGem />
            </ProtectedRoute>
          }
        />

        {/* ✅ Update Astrology Page */}
        <Route
          path="/admin/update-astrology"
          element={
            <ProtectedRoute>
              <Updateastrology />
            </ProtectedRoute>
          }
        />

        {/* ✅ View Astrology Page */}
        <Route
          path="/admin/view-astrology/"
          element={
            <ProtectedRoute>
              <Viewastrology />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/update-view/:id"
  element={
    <ProtectedRoute>
      <UpdateView />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
