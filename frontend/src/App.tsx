import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Walk from "./pages/Walk";
import Trees from "./pages/Trees";
import Transport from "./pages/Transport";
import Plastic from "./pages/Plastic";
import Rewards from "./pages/Rewards";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; 
import VendingMachine from "./pages/VendingMachine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Inhe koi bhi dekh sakta hai */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Inke liye Login zaroori hai */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/walk"
            element={
              <ProtectedRoute>
                <Walk />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trees"
            element={
              <ProtectedRoute>
                <Trees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transport"
            element={
              <ProtectedRoute>
                <Transport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plastic"
            element={
              <ProtectedRoute>
                <Plastic />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
          <Route
            path="/vending-machine"
            element={<VendingMachine />}
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;