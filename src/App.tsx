
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TravelerDashboard from "./pages/TravelerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import OrderDetails from "./pages/OrderDetails";
import CreateOrder from "./pages/CreateOrder";
import CreateFlight from "./pages/CreateFlight";
import SearchFlights from "./pages/SearchFlights";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/traveler-dashboard" element={<TravelerDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/create-flight" element={<CreateFlight />} />
            <Route path="/search-flights" element={<SearchFlights />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;