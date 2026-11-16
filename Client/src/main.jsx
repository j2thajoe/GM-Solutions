import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { Swiper, SwiperSlide } from "swiper/react";

//contexts
import { AuthProvider } from "../contexts/AuthContext.jsx";
import { CartProvider } from "../contexts/CartContext.jsx";
import { SidebarProvider } from "../contexts/SidebarContexts";
import { ProductFilterProvider } from "../contexts/ProductFilterContext";
import { ClientProvider } from "../contexts/ClientContext";

//bootstrap css
import "swiper/css";
import "././assets/css/bootstrap.min.css";
import "././assets/js/bootstrap.min.js/";

//fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import Home from "./home/Home.jsx";
import Shop from "./shop/Shop.jsx";
import ShopHome from "./shop/ShopHome.jsx";
import ArtAuction from "./ARTs/ArtAuction.jsx";
import ArtGallery from "./ARTs/ArtGallery.jsx";
import ArtInformation from "./ARTs/ArtInformation.jsx";
import Blog from "./blog/Blog.jsx";
import Contact from "./contact/Contact.jsx";
import Services from "./services/Services.jsx";
import Courses from "./study/Courses.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import ECitizenServices from "./services/ECitizenServices/ECitizenServices.jsx";
import KRA from "./services/ECitizenServices/KRA/KRA.jsx";
import HEF from "./services/ECitizenServices/HEF/HEF.jsx";
import NTSA from "./services/ECitizenServices/NTSA/NTSA.jsx";
import SHIF from "./services/ECitizenServices/SHIF/SHIF.jsx";
import NSSF from "./services/ECitizenServices/NSSF/NSSF.jsx";
import KUCCPS from "./services/ECitizenServices/KUCCPS/KUCCPS.jsx";
import WebsitenGraphicDesigns from "./services/WebsiteandGraphicDesigns/WebsiteandGraphicDesigns.jsx";
import ECitizen from "./services/ECitizenServices/ECitizen/ECitizen.jsx";
import PhotoDesign from "./services/WebsiteandGraphicDesigns/PhotoDesign/PhotoDesign.jsx";
import PhotoEditing from "./services/WebsiteandGraphicDesigns/PhotoEditing/PhotoEditing.jsx";
import PosterDesign from "./services/WebsiteandGraphicDesigns/PosterDesign/PosterDesign.jsx";
import WebsiteDesign from "./services/WebsiteandGraphicDesigns/WebsiteDesign/WebsiteDesign.jsx";
import PrintingBinding from "./services/PrintingBinding/PrintingBinding.jsx";
import ConstructionSolutions from "./services/Solutions/ConstructionSolutions/ConstructionSolutions.jsx";
import GeneralRepairandMaintenance from "./services/GeneralRepairandMaintenance/GeneralRepairandMaintenance.jsx";
import ComputerRepairnMaintenance from "./services/Solutions/ComputerandLaptopSolutions/ComputerRepairandMaintenance/ComputerRepairandMaintenance.jsx";
import NetworkingnConnectivity from "./services/Solutions/ComputerandLaptopSolutions/NetworkingandConnectivity/NetworkingandConnectivity.jsx";
import ComputerSoftwarenInstallationnSupport from "./services/Solutions/ComputerandLaptopSolutions/SoftwareInstallationandSupport/SoftwareInstallationandSupport.jsx";
import Solutions from "./services/Solutions/Solutions.jsx";
import MobileSolutions from "./services/Solutions/MobileSolutions/MobileSolutions.jsx";
import HomenOfficeSolutions from "./services/Solutions/HomeandOfficeSolutions/HomeandOfficeSolutions.jsx";
import EducationalnTrainingSolutions from "./services/Solutions/EducationalandTrainingSolutions/EducationalandTrainingSolutions.jsx";
import ComputernLaptopSolutions from "./services/Solutions/ComputerandLaptopSolutions/ComputerandLaptopSolutions.jsx";
import ConnectivitynNetworkServices from "./services/Solutions/MobileSolutions/ConnectivityandNetworkServices/ConnectivityandNetworkServices.jsx";
import MobileRepairnMaintenance from "./services/Solutions/MobileSolutions/MobileRepairandMaintenance/MobileRepairandMaintenance.jsx";
import SIMandeSIMServices from "./services/Solutions/MobileSolutions/SIMandeSIMServices/SIMandeSIMServices.jsx";
import MobileSoftwarenInstallationnSupport from "./services/Solutions/MobileSolutions/SoftwareInstallationandSupport/SoftwareInstallationandSupport.jsx";
import NetworknSecuritySolutions from "./services/Solutions/NetworkandSecuritySolutions/NetworkandSecuritySolutions.jsx";
import RetailnProductSourcing from "./services/Solutions/RetailandProductSourcing/RetailandProductSourcing.jsx";
import ConstructionSolutionsAdmin from "./services/Solutions/ConstructionSolutions/ConstructionSolutionsAdmin.jsx";

// Admin pages

import AdminLayout from "./admin/adminpage/AdminLayout.jsx";
{
  /*
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";
import AdminSettings from "./admin/AdminSettings.jsx";
import AdminRoutes from "./admin/AdminRoutes";

*/
}
import RequireAdmin from "./admin/RequireAdmin";
import AdminHome from "./admin/AdminHome.jsx";
import CompleteSiteAdministrator from "./admin/CompleteSiteAdmin.jsx";
import ARTsAdmin from "./admin/ARTsAdmin.jsx";
import ServicesAdmin from "./admin/ServicesAdmin.jsx";
import ShopAdmin from "./admin/ShopAdmin.jsx";
import StudyAdmin from "./admin/StudyAdmin.jsx";

// Shop componennts

import ProductInformation from "./shop/ProductInformation.jsx";
import ProductForm from "./shop/ProductForm.jsx";
import SliderManager from "./home/sliders/SliderManager.jsx";
import ProductCards from "./shop/ProductCards.jsx";
import Cart from "./shop/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/shopHome", element: <ShopHome /> },
        { path: "/services", element: <Services /> },
        { path: "/study", element: <Courses /> },
        { path: "/artauction/:id", element: <ArtAuction /> },
        { path: "/artgallery", element: <ArtGallery /> },
        { path: "/artinformation", element: <ArtInformation /> },
        { path: "/blog", element: <Blog /> },
        { path: "/contact", element: <Contact /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/ECitizenServices", element: <ECitizenServices /> },
        { path: "/KRA", element: <KRA /> },
        { path: "/HEF", element: <HEF /> },
        { path: "/NTSA", element: <NTSA /> },
        { path: "/NSSF", element: <NSSF /> },
        { path: "/SHIF", element: <SHIF /> },
        { path: "/KUCCPS", element: <KUCCPS /> },
        { path: "/eCitizen", element: <ECitizen /> },
        {
          path: "/WebsitenGraphicDesigns",
          element: <WebsitenGraphicDesigns />,
        },
        { path: "/PhotoDesign", element: <PhotoDesign /> },
        { path: "/PhotoEditing", element: <PhotoEditing /> },
        { path: "/PosterDesign", element: <PosterDesign /> },
        { path: "/WebsiteDesign", element: <WebsiteDesign /> },
        { path: "/Solutions", element: <Solutions /> },

        //computer and laptop solutions
        {
          path: "/ComputerandLaptopSolutions",
          element: <ComputernLaptopSolutions />,
        },
        {
          path: "/ComputerRepairandMaintenance",
          element: <ComputerRepairnMaintenance />,
        },
        {
          path: "/NetworkingandConnectivity",
          element: <NetworkingnConnectivity />,
        },
        {
          path: "/ComputerSoftwareInstallationandSupport",
          element: <ComputerSoftwarenInstallationnSupport />,
        },

        //mobile solutions
        { path: "/MobileSolutions", element: <MobileSolutions /> },
        {
          path: "/ConnectivityandNetworkServices",
          element: <ConnectivitynNetworkServices />,
        },
        {
          path: "/MobileRepairandMaintenance",
          element: <MobileRepairnMaintenance />,
        },
        { path: "/SIMandeSIMServices", element: <SIMandeSIMServices /> },
        {
          path: "/MobileSoftwareInstallationandSupport",
          element: <MobileSoftwarenInstallationnSupport />,
        },
        {
          path: "/EducationalandTrainingSolutions",
          element: <EducationalnTrainingSolutions />,
        },
        { path: "/HomeandOfficeSolutions", element: <HomenOfficeSolutions /> },

        {
          path: "/NetworkandSecuritySolutions",
          element: <NetworknSecuritySolutions />,
        },
        {
          path: "/GeneralRepairsandMaintenance",
          element: <GeneralRepairandMaintenance />,
        },
        {
          path: "/RetailandProductSourcing",
          element: <RetailnProductSourcing />,
        },
        {
          path: "/CompleteSiteAdmininistrator",
          element: <CompleteSiteAdministrator />,
        },
        { path: "/PrintingBinding", element: <PrintingBinding /> },
        { path: "/ConstructionSolutions", element: <ConstructionSolutions /> },
        { path: "/product/:id", element: <ProductInformation /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
      ],
    },

    {
      path: "/admin",
      element: (
        <RequireAdmin>
          <AdminLayout />
        </RequireAdmin>
      ),
      children: [
        { index: true, element: <AdminHome /> },

        {
          path: "CompleteSiteAdministrator",
          element: <CompleteSiteAdministrator />,
        },
        {
          path: "ARTsAdministrator",
          element: <ARTsAdmin />,
        },
        {
          path: "ServicesAdministrator",
          element: <ServicesAdmin />,
        },
        {
          path: "ShopAdministrator",
          element: <ShopAdmin />,
        },
        {
          path: "StudyAdministrator",
          element: <StudyAdmin />,
        },
        {
          path: "ConstructionSolutionsAdmin",
          element: <ConstructionSolutionsAdmin />,
        },
      ],
    },
  ],

  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SidebarProvider>
      <ProductFilterProvider>
        <ClientProvider>
          <CartProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </CartProvider>
        </ClientProvider>
      </ProductFilterProvider>
    </SidebarProvider>
  </React.StrictMode>
);
