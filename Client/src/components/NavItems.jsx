import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { ClientContext } from "../../contexts/ClientContext.jsx";
import ClientProfile from "../components/ClientProfile.jsx";
import logo from "../assets/images/logo/GMBizLogo.jpeg";
import defaultProfileIcon from "../assets/images/icon/profileIcon.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { useProductFilter } from "../../contexts/ProductFilterContext";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSidebar } from "../../contexts/SidebarContexts.jsx";
// Simulate checking if the user is logged in

const NavItems = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const { setFilters } = useProductFilter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { client, setClient } = useContext(ClientContext);
  const { logoutClient } = useContext(ClientContext);
  const profile = ClientProfile();
  const [activeNav, setActiveNav] = useState(null);
  const [activeMenu, setActiveMenu] = useState({
    1: false, // for Shop
    2: false, // for Services
    3: false, // for Graphic Designs
    4: false, // for Government Services
    5: false, // for Arts
  });

  const userClient = JSON.parse(localStorage.getItem("client"));

  const AdminTrigger = () => {
    const { toggleSidebars } = useSidebar();

    const handleAdminClick = (e) => {
      e.preventDefault();
      toggleSidebars(); // open both sidebars
    };

    return (
      <span
        onClick={handleAdminClick}
        className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold cursor-pointer hover:bg-yellow-300 transition"
      >
        Admin
      </span>
    );
  };

  const categories = [
    "All",
    "electronics",
    "phoneandaccessories",
    "computersandaccessories",
    "electricalsandpowersolutions",
    "networking",
    "eWaste",
    "smarthomeandsecurity",
    "officeandstationarysupplies",
    "lifestyleandfashion",
    "homeandkitchenappliances",
    "toolsandhardware",
    "medicalandhealthequipment",
  ];

  const handleCategoryClick = (category) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: category,
    }));
  };

  const handleDropdownToggle = () => {
    console.log("Toggle clicked");
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-item")) {
        setActiveNav(null);
        setActiveMenu({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state:", user);

      if (user) {
        const docRef = doc(db, "clients", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("Firestore doc exists:", docSnap.exists());

        if (docSnap.exists()) {
          const profile = { id: user.uid, ...docSnap.data() };
          setUserData(profile);
          setClient(profile);
          localStorage.setItem("client", JSON.stringify(profile));
        } else {
          localStorage.removeItem("client");
          localStorage.removeItem("profileImage");
          setUserData(null);
          setClient(null);
        }
      } else {
        localStorage.removeItem("client");
        localStorage.removeItem("profileImage");
        setUserData(null);
        setClient(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    if (storedClient) {
      try {
        const parsedClient = JSON.parse(storedClient);
        if (parsedClient && parsedClient.username) {
          setUserData(parsedClient);
          setClient(parsedClient);
        }
      } catch (err) {
        console.warn("Corrupt client data in localStorage");
        localStorage.removeItem("client");
      }
    }
  }, []);

  const handleMouseEnter = (index) => {
    setActiveMenu({
      [index]: true,
    });
  };

  const handleMouseLeave = () => {
    setActiveMenu({});
  };

  const handleLogout = async () => {
    await logoutClient();
    navigate("/login");
  };

  const handleAdminTextClick = () => {
    navigate("/admin");
  };

  const formatCategory = (cat) =>
    cat
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/and/gi, " & ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    // Initialize defaults on mount
    setFilters((prev) => ({
      selectedCategory: prev.selectedCategory || null,
      priceRange: prev.priceRange || null,
      sortBy: prev.sortBy || null,
    }));
  }, [setFilters]);

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top start  */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area"></div>
        </div>
      </div>

      {/* Header Bottom */}

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"}>
                  <img
                    src={logo}
                    alt="GMBusinessLogo"
                    className="GMBusinessLogo"
                  />
                </Link>
              </div>
            </div>

            {/* menu area */}

            <div className="menu-area">
              <div className="menu">
                <ul
                  className={`lab-ul ${menuToggle ? "flex" : "hidden"} md:flex`}
                >
                  <li
                    className={`navbar-item ${activeNav === "home" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(activeNav === "home" ? null : "home");
                      setActiveMenu({ 1: true });
                    }}
                  >
                    <Link
                      to="/"
                      className={`navbar-item-text ${
                        activeNav === "home" ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>

                  {/* Shop Item with dropdown */}

                  <li
                    className={`navbar-item ${activeNav === "shop" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(activeNav === "shop" ? null : "shop");
                      setActiveMenu({ 2: true });
                    }}
                  >
                    <Link
                      to="/shophome"
                      className={`navbar-item-text ${
                        activeNav === "shop" ? "active" : ""
                      }`}
                    >
                      Shop
                    </Link>
                    <span className="arrow" role="img" aria-label="dropdown">
                      &#10148;
                    </span>
                    {(activeMenu[2] || activeNav === "shop") && (
                      <ul className="dropdown-list active">
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text "
                            onClick={() => handleCategoryClick("electronics")}
                          >
                            Electronics
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("phoneandaccessories")
                            }
                          >
                            Phone & Accessories
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("computersandaccessories")
                            }
                          >
                            Computer & Accessories
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick(
                                "electricalsandpowersolutions",
                              )
                            }
                          >
                            {" "}
                            Electricals & Power Solutions
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() => handleCategoryClick("networking")}
                          >
                            Networking
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() => handleCategoryClick("eWaste")}
                          >
                            E-Waste
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("smarthomeandsecurity")
                            }
                          >
                            Smart Home & Security
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("officeandstationarysupplies")
                            }
                          >
                            Office & Stationary Supplies
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("lifestyleandfashion")
                            }
                          >
                            Lifestyle & Fashion
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("homeandkitchenappliances")
                            }
                          >
                            Home & Kitchen Appliances
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("toolsandhardware")
                            }
                          >
                            Tools & Hardware
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/shop"
                            className="navbar-item-text"
                            onClick={() =>
                              handleCategoryClick("medicalandhealthequipment")
                            }
                          >
                            Medical & Health Equipment
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Services Item with dropdown */}
                  <li
                    className={`navbar-item ${activeNav === "services" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(
                        activeNav === "services" ? null : "services",
                      );
                      setActiveMenu({ 3: true });
                    }}
                  >
                    <Link
                      to="/services"
                      className={`navbar-item-text ${
                        activeNav === "services" ? "active" : ""
                      }`}
                    >
                      Services
                    </Link>
                    <span className="arrow" role="img" aria-label="dropdown">
                      &#10148;
                    </span>
                    {(activeMenu[3] || activeNav === "services") && (
                      <ul className="dropdown-list active">
                        <li className="dropdown-item">
                          <Link
                            to="/PrintingBinding"
                            className="navbar-item-text"
                          >
                            Print, Bind & Laminate
                          </Link>
                        </li>

                        {/* Services Item with dropdown */}
                        <li
                          className={`navbar-item ${activeNav === "websitegraphicdesign" ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav(
                              activeNav === "websitegraphicdesign"
                                ? null
                                : "websitegraphicdesign",
                            );
                            setActiveMenu({ 3: true });
                          }}
                        >
                          <Link
                            to="/WebsitenGraphicDesigns"
                            className={`navbar-item-text ${
                              activeNav === "websitegraphicdesign"
                                ? "active"
                                : ""
                            }`}
                          >
                            Website & Graphic Designs
                          </Link>

                          <span
                            className={`arrow ${activeMenu[3] ? "active" : ""}`}
                            role="img"
                            aria-label="dropdown"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu((prev) => ({
                                ...prev,
                                3: !prev[3],
                              }));
                            }}
                          >
                            &#10148;
                          </span>
                          {(activeMenu[3] ||
                            activeNav === "websitegraphicdesign") && (
                            <ul className="dropdown-list active">
                              <li className="dropdown-item">
                                <Link
                                  to="/PosterDesign"
                                  className="navbar-item-text"
                                >
                                  Poster Design
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/PhotoDesign"
                                  className="navbar-item-text"
                                >
                                  Photo Design
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/PhotoEditing"
                                  className="navbar-item-text"
                                >
                                  Photo Editing
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/WebsiteDesign"
                                  className="navbar-item-text"
                                >
                                  Website Design
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>

                        {/*Government Services item with dropdown */}

                        <li
                          className={`navbar-item ${activeNav === "ecitizenservices" ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav(
                              activeNav === "ecitizenservices"
                                ? null
                                : "ecitizenservices",
                            );
                            setActiveMenu({ 3: true });
                          }}
                        >
                          <Link
                            to="/ECitizenServices"
                            className={`navbar-item-text ${
                              activeNav === "ecitizenservices" ? "active" : ""
                            }`}
                          >
                            ECitizen Services
                          </Link>
                          <span
                            className={`arrow ${activeMenu[3] ? "active" : ""}`}
                            role="img"
                            aria-label="dropdown"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu((prev) => ({
                                ...prev,
                                3: !prev[3],
                              }));
                            }}
                          >
                            &#10148;
                          </span>
                          {(activeMenu[3] ||
                            activeNav === "ecitizenservices") && (
                            <ul className="dropdown-list">
                              <li className="dropdown-item">
                                <Link to="/KRA" className="navbar-item-text">
                                  KRA
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link to="/HEF" className="navbar-item-text">
                                  HEF
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link to="/NTSA" className="navbar-item-text">
                                  NTSA
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link to="/NSSF" className="navbar-item-text">
                                  NSSF
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link to="/SHIF" className="navbar-item-text">
                                  SHIF
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link to="/KUCCPS" className="navbar-item-text">
                                  KUCCPS
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>

                        <li
                          className={`navbar-item ${activeNav === "solutions" ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveNav(
                              activeNav === "solutions" ? null : "solutions",
                            );
                            setActiveMenu({ 3: true });
                          }}
                        >
                          <Link
                            to="/Solutions"
                            className={`navbar-item-text ${
                              activeNav === "solutions" ? "active" : ""
                            }`}
                          >
                            Solutions
                          </Link>
                          <span
                            className={`arrow ${activeMenu[3] ? "active" : ""}`}
                            role="img"
                            aria-label="dropdown"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu((prev) => ({
                                ...prev,
                                3: !prev[3],
                              }));
                            }}
                          >
                            &#10148;
                          </span>
                          {(activeMenu[3] || activeNav === "solutions") && (
                            <ul className="dropdown-list">
                              <li className="dropdown-item">
                                <Link
                                  to="/MobileSolutions"
                                  className="navbar-item-text"
                                >
                                  Mobile Solutions
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/ComputerandLaptopSolutions"
                                  className="navbar-item-text"
                                >
                                  Computer & Laptop Solutions
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/EducationalandTrainingSolutions"
                                  className="navbar-item-text"
                                >
                                  Educational & Training Solutions
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/NetworkandSecuritySolutions"
                                  className="navbar-item-text"
                                >
                                  Networking & Security Solutions
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/HomeandOfficeSolutions"
                                  className="navbar-item-text"
                                >
                                  Home & Office Automation
                                </Link>
                              </li>
                              <li className="dropdown-item">
                                <Link
                                  to="/RetailandProductSourcing"
                                  className="navbar-item-text"
                                >
                                  Retail & Product Sourcing
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>

                        <li className="dropdown-item">
                          <Link
                            to="/GeneralRepairsandMaintenance"
                            className="navbar-item-text"
                          >
                            General Repairs & Maintenance
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/*Study item */}

                  <li
                    className={`navbar-item ${activeNav === "study" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(activeNav === "study" ? null : "study");
                      setActiveMenu({ 4: true });
                    }}
                  >
                    <Link
                      to="/Study"
                      className={`navbar-item-text ${
                        activeNav === "study" ? "active" : ""
                      }`}
                    >
                      Study
                    </Link>
                  </li>

                  {/*Arts item with dropdown */}

                  <li
                    className={`navbar-item ${activeNav === "arts" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(activeNav === "arts" ? null : "arts");
                      setActiveMenu({ 5: true });
                    }}
                  >
                    <Link
                      to="/artgallery"
                      className={`navbar-item-text ${
                        activeNav === "arts" ? "active" : ""
                      }`}
                    >
                      ARTs
                    </Link>
                    <span className="arrow" role="img" aria-label="dropdown">
                      &#10148;
                    </span>
                    {(activeMenu[5] || activeNav === "arts") && (
                      <ul className="dropdown-list">
                        <li className="dropdown-item">
                          <Link to="/artgallery" className="navbar-item-text">
                            Art Gallery
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link to="/artauction" className="navbar-item-text">
                            Art Auction
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            to="/artinformation"
                            className="navbar-item-text"
                          >
                            Art Information
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className={`navbar-item ${activeNav === "contact" ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNav(activeNav === "contact" ? null : "contact");
                      setActiveMenu({ 6: true });
                    }}
                  >
                    <Link
                      to="/contact"
                      className={`navbar-item-text ${
                        activeNav === "contact" ? "active" : ""
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* sign up & log in */}

            <div className="profile-n-menu-toggles">
              {userData ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="profile-dropdown relative rounded-full flex items-center gap-2 cursor-pointer"
                    onClick={handleDropdownToggle}
                  >
                    <img
                      src={userData.profilePic || defaultProfileIcon}
                      alt={"Profile"}
                      className="profile-image w-8 h-8 rounded-full cursor-pointer"
                    />
                  </div>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-profile-list absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 flex flex-col"
                      >
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                          onClick={() => {
                            navigate("/admin");
                            setDropdownOpen(false);
                            import("../../contexts/SidebarContexts.jsx").then(
                              ({ useSidebar }) => {
                                // can't use hook directly here, so we handle it properly below
                              },
                            );
                          }}
                        >
                          {userClient?.isAdmin && <AdminTrigger />}
                        </Link>

                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>

                        <Link
                          to="/cart"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Cart
                        </Link>

                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="auth-links flex space-x-4">
                  <Link to="/register" className="btn">
                    Register
                  </Link>
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </div>
              )}

              {/* Hamburger menu toggle for mobile */}

              <button
                className="menu-toggle-btn md:hidden"
                onClick={() => setMenuToggle((prev) => !prev)}
                aria-label="Toggle Menu"
              >
                {/* Hamburger Icon */}
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuToggle ? (
                    // X icon
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    // Hamburger icon
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavItems;
