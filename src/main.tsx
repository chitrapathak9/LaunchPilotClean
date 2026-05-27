import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Import new pages
import { Features } from './pages/Features';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SkillFinder } from './pages/SkillFinder';
import { SkillsCatalog } from './pages/SkillsCatalog';
import { SkillDetail } from './pages/SkillDetail';
import { Pricing } from './pages/Pricing';
import { BlogListing } from './pages/BlogListing';
import { BlogPost } from './pages/BlogPost';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardSkills } from './pages/DashboardSkills';
import { Bundles } from './pages/Bundles';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Demo } from './pages/Demo';
import { DashboardProjects } from './pages/DashboardProjects';
import { DashboardActivity } from './pages/DashboardActivity';
import { DashboardSettings } from './pages/DashboardSettings';
import { DashboardBilling } from './pages/DashboardBilling';
import { DashboardSupport } from './pages/DashboardSupport';
import { StripeCheckoutMock } from './pages/StripeCheckoutMock';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { BookAppointment } from './pages/BookAppointment';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// ─── ScrollToTop ───────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skill-finder" element={<SkillFinder />} />
        <Route path="/skills" element={<SkillsCatalog />} />
        <Route path="/skills/:slug" element={<SkillDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bundles" element={<Bundles />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<BookAppointment />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        
        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/skills" element={<DashboardSkills />} />
          <Route path="/dashboard/projects" element={<DashboardProjects />} />
          <Route path="/dashboard/activity" element={<DashboardActivity />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="/dashboard/billing" element={<DashboardBilling />} />
          <Route path="/dashboard/support" element={<DashboardSupport />} />
        </Route>

        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

