import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ExplorePage from './pages/ExplorePage';
import ServicesPage from './pages/ServicesPage';
import NotFoundPage from './pages/NotFoundPage';
import MarketplacePage from "./pages/MarketplacePage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import PhysicalGoodsPage from "./pages/PhysicalGoodsPage";
import DigitalAssetsPage from "./pages/DigitalAssetsPage";
import EventsAndTasksPage from "./pages/EventsAndTasksPage";
import ArtAndCraftPage from "./pages/ArtAndCraftPage";
import CreateListingWizard from "./pages/CreateListing/CreateListingWizard";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import AuthModal from "./components/AuthModal";
import DevControls from "./components/DevControls";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  return null;
}

function AppContent() {
    const location = useLocation();
    return (
    <div className="min-h-screen bg-surface flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-grow pt-24"> {/* Offset for fixed header */}

        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<ServicesPage />} />
          <Route path="/physical-goods" element={<PhysicalGoodsPage />} />
          <Route path="/physical-goods/:categoryId" element={<PhysicalGoodsPage />} />
          <Route path="/digital-assets" element={<DigitalAssetsPage />} />
          <Route path="/digital-assets/:categoryId" element={<DigitalAssetsPage />} />
          <Route path="/events-tasks" element={<EventsAndTasksPage />} />
          <Route path="/events-tasks/:categoryId" element={<EventsAndTasksPage />} />
          <Route path="/art-craft" element={<ArtAndCraftPage />} />
          <Route path="/art-craft/:categoryId" element={<ArtAndCraftPage />} />
          <Route path="/:domain/:subCategoryId/marketplace" element={<MarketplacePage key={location.pathname + location.search} />} />
          <Route path="/listing/:listingId" element={<ListingDetailsPage />} />
          <Route path="/create-listing" element={<CreateListingWizard />} />
          <Route path="/checkout/:listingId" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage requiresFiles={true} />} />
          <Route path="/order-success" element={<OrderSuccessPage requiresFiles={true} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/seller-portal" element={<DashboardPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
      {/* Global Auth Modal — lives outside <Routes> so it works on any page */}
      <AuthModal />
      {import.meta.env.DEV && <DevControls />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
