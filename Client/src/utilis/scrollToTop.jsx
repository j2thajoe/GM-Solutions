import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0); // or window.scroll({ top: 0, behavior: "smooth" }) for smooth scrolling
  }, [location]);

  return null;
};

export default ScrollToTop;
