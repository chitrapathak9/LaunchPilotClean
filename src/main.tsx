import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Public pages
import { Features } from './pages/Features';
import { AboutUs } from './pages/AboutUs';
import { EngagementModels } from './pages/EngagementModels';
import { GlobalDelivery } from './pages/GlobalDelivery';
import { WhyLaunch } from './pages/WhyLaunch';
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
import { CaseStudiesListing } from './pages/CaseStudiesListing';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { ServiceDetail } from './pages/ServiceDetail';
import { SolutionDetail } from './pages/SolutionDetail';
import { IndustryDetail } from './pages/IndustryDetail';

// Auth context & route protection
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Admin pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersList } from './pages/admin/users/UsersList';
import { BlogsList } from './pages/admin/blogs/BlogsList';
import { BlogEditor } from './pages/admin/blogs/BlogEditor';
import { ContactsList } from './pages/admin/contacts/ContactsList';
import { ContactDetail } from './pages/admin/contacts/ContactDetail';
import { CaseStudiesList } from './pages/admin/case-studies/CaseStudiesList';
import { CaseStudyEditor } from './pages/admin/case-studies/CaseStudyEditor';

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
          {/* ─── Public Routes ─── */}
          <Route path="/" element={<App />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/engagement-models" element={<EngagementModels />} />
          <Route path="/global-delivery" element={<GlobalDelivery />} />
          <Route path="/why-launch" element={<WhyLaunch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skill-finder" element={<SkillFinder />} />
          <Route path="/skills" element={<SkillsCatalog />} />
          <Route path="/skills/:slug" element={<SkillDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/case-studies" element={<CaseStudiesListing />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkout" element={<BookAppointment />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/demo" element={<Demo />} />

          {/* ─── Protected User Dashboard Routes ─── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/skills" element={<DashboardSkills />} />
            <Route path="/dashboard/projects" element={<DashboardProjects />} />
            <Route path="/dashboard/activity" element={<DashboardActivity />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/billing" element={<DashboardBilling />} />
            <Route path="/dashboard/support" element={<DashboardSupport />} />
          </Route>

          {/* ─── Admin Routes ─── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/blogs" element={<BlogsList />} />
            <Route path="/admin/blogs/new" element={<BlogEditor />} />
            <Route path="/admin/blogs/:id/edit" element={<BlogEditor />} />
            <Route path="/admin/contacts" element={<ContactsList />} />
            <Route path="/admin/contacts/:id" element={<ContactDetail />} />
            <Route path="/admin/case-studies" element={<CaseStudiesList />} />
            <Route path="/admin/case-studies/new" element={<CaseStudyEditor />} />
            <Route path="/admin/case-studies/:id/edit" element={<CaseStudyEditor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
