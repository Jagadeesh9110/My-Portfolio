
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>{
  return(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          <Routes>
            <Route path="/*" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
