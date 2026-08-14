// Hearth & Paper: route the café through an editorial shell, with oat/espresso surfaces,
// DM Serif Display headlines, Manrope details, and calm page-turn motion.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Story from "./pages/Story";
import Visit from "./pages/Visit";
import Checkout from "./pages/Checkout";
import { CustomizationProvider } from "./contexts/CustomizationContext";

const getBase = () => {
  const path = window.location.pathname;
  if (path.toLowerCase().startsWith("/cafe")) return "/Cafe";
  return "";
};

function Router() {
  return (
    <WouterRouter base={getBase()}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/story" component={Story} />
        <Route path="/visit" component={Visit} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <CustomizationProvider>
            <SiteLayout>
              <Router />
            </SiteLayout>
          </CustomizationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
