import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Find the scrollable container (the fixed container with overflow-y-auto)
    const scrollContainer = document.querySelector(
      ".fixed.inset-0.overflow-y-auto"
    );

    if (scrollContainer) {
      // Scroll the container to top
      scrollContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // Use 'smooth' for smooth scrolling
      });
    } else {
      // Fallback to window scroll if container not found
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;

// Usage in App.tsx:
// Add this import: import ScrollToTop from './components/ScrollToTop';
// Then add <ScrollToTop /> right after <BrowserRouter> and before your routes
