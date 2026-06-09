import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";

function getBase() {
  const p = window.location.pathname;
  if (p.startsWith('/weight-loss')) return '/weight-loss';
  if (p.startsWith('/skin')) return '/skin';
  if (p.startsWith('/hair')) return '/hair';
  return '/old';
}
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Diagnostic from "./pages/Diagnostic";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

function ChatWidgetVisibility() {
  const [location] = useLocation();
  useEffect(() => {
    (window as any).__applyWidgetVisibility?.();
  }, [location]);
  return null;
}

function Router() {
  return (
    <Layout>
      <ChatWidgetVisibility />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book" component={Book} />
        <Route path="/booked" component={Diagnostic} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <WouterRouter base={getBase()}>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;
