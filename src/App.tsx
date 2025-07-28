import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
// import Agencies from "./pages/Agencies";
import Hotels from "./pages/Hotels";
import DMCs from "./pages/DMCs";
import Influencers from "./pages/Influencers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Claim from "./pages/Claim";
import ListingDetail from "./pages/ListingDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import DMCDashboard from "./pages/DMCDashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from './pages/AdminLogin';
import { useState, useEffect } from 'react';

function AdminDashboardProtected({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<null | boolean>(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  if (isAdmin === null) return null; // or a loading spinner

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                {/* <Route path="/agencies" element={<Agencies />} /> */}
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/dmcs" element={<DMCs />} />
                <Route path="/influencers" element={<Influencers />} /> 
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/listing/:id" element={<ListingDetail />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={
                  <AdminDashboardProtected>
                    <AdminDashboard />
                  </AdminDashboardProtected>
                } />
                <Route path="/dmc-dashboard" element={<DMCDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
