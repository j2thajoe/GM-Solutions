import { Outlet } from "react-router-dom";
import "./App.css";
import NavItems from "./components/NavItems";
import Footer from "./components/Footer";
import ScrollToTop from "./utilis/scrollToTop";
import { ProductFilterProvider } from "../contexts/ProductFilterContext";
import { CartProvider } from "../contexts/CartContext";
import { ClientProvider } from "../contexts/ClientContext";
import { SidebarProvider } from "../contexts/SidebarContexts";

function App() {
  return (
    <>
      <SidebarProvider>
        <ProductFilterProvider>
          <ClientProvider>
            <CartProvider>
              <ScrollToTop />
              <NavItems />
              <div className="min-vh-100">
                <Outlet />
              </div>
              <Footer />
            </CartProvider>
          </ClientProvider>
        </ProductFilterProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
