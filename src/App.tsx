
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Chatbots from "./pages/Chatbots";
import Content from "./pages/Content";
import Scheduler from "./pages/Scheduler";
import Campaigns from "./pages/Campaigns";
import Messages from "./pages/Messages";
import Automation from "./pages/Automation";
import Database from "./pages/Database";
import Tenants from "./pages/Tenants";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chatbots" element={<Chatbots />} />
            <Route path="/content" element={<Content />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/database" element={<Database />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
