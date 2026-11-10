import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/style/style.css";

export default function Home() {
  // 1. Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 70,
      easing: "ease-out-cubic",
    });
  }, []);

  // 2. Global State: Cart, Wishlist, Notifications, Modals
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cloud Luxe Sectional Sofa",
      price: 34999,
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800",
      color: "Royal Navy Blue",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([1, 4]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Show Toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  // Add To Cart
  const handleAddToCart = (product, chosenColor = null) => {
    const colorObj = chosenColor || (product.colors ? product.colors[0] : null);
    const colorName = colorObj?.name || "Standard";
    const imageSrc = colorObj?.image || product.image;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === colorName
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === colorName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.priceNum,
          image: imageSrc,
          color: colorName,
          quantity: 1,
        },
      ];
    });

    triggerToast(`Added "${product.name}" (${colorName}) to your cart!`);
  };

  // Update Cart Quantity
  const handleUpdateQty = (id, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId, productName) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        triggerToast(`Removed "${productName}" from your wishlist.`);
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast(`Added "${productName}" to your wishlist!`);
        return [...prev, productId];
      }
    });
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 50000;
  const freeShippingProgress = Math.min(
    100,
    (cartSubtotal / freeShippingThreshold) * 100
  );

  // 3. Hero Interactive Sofa Configurator
  const heroSofaOptions = [
    {
      name: "Royal Navy Blue",
      hex: "#1b3b6f",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800",
      material: "Italian Velvet",
    },
    {
      name: "Cognac Amber Leather",
      hex: "#a45d2e",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
      material: "Full-Grain Leather",
    },
    {
      name: "Emerald Green Velvet",
      hex: "#1e4d3b",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      material: "Plush Velvet",
    },
    {
      name: "Ivory Cloud Bouclé",
      hex: "#eae4d9",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
      material: "Textured Bouclé",
    },
    {
      name: "Terracotta Rust",
      hex: "#b85437",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800",
      material: "Linen Blend",
    },
  ];
  const [heroSofa, setHeroSofa] = useState(heroSofaOptions[0]);

  // 4. Products Master Catalog
  const allProducts = [
    {
      id: 1,
      name: "Cloud Luxe Sectional Sofa",
      category: "Living Room",
      price: "₹34,999",
      priceNum: 34999,
      rating: 4.9,
      reviews: 128,
      tag: "BEST SELLER",
      description:
        "Engineered for deep-seated bliss with goose-down cushion topper and solid kiln-dried beechwood frame.",
      dimensions: '96"W x 62"D x 34"H',
      materials: "Handcrafted solid beechwood, High-resilience memory foam",
      colors: [
        {
          name: "Royal Navy Blue",
          hex: "#1b3b6f",
          image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800",
        },
        {
          name: "Cognac Leather",
          hex: "#a45d2e",
          image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
        },
        {
          name: "Emerald Green",
          hex: "#1e4d3b",
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        },
        {
          name: "Ivory Cloud",
          hex: "#eae4d9",
          image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
        },
        {
          name: "Terracotta Rust",
          hex: "#b85437",
          image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800",
        },
      ],
    },
    {
      id: 2,
      name: "Nordic Contour Lounge Chair",
      category: "Living Room",
      price: "₹14,499",
      priceNum: 14499,
      rating: 4.8,
      reviews: 94,
      tag: "TRENDING",
      description:
        "Sculpted ergonomics meet Scandinavian minimalism. Supportive curved back with solid oak tapered legs.",
      dimensions: '32"W x 34"D x 38"H',
      materials: "FSC Certified White Oak, Stain-resistant bouclé",
      colors: [
        {
          name: "Mustard Ochre",
          hex: "#d99726",
          image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
        },
        {
          name: "Warm Amber Cognac",
          hex: "#9b5123",
          image: "https://images.unsplash.com/photo-1580481077195-c3a82145d875?w=800",
        },
        {
          name: "Natural Oak",
          hex: "#d2b48c",
          image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800",
        },
        {
          name: "Charcoal Slate",
          hex: "#373737",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        },
      ],
    },
    {
      id: 3,
      name: "Artisan Walnut Dining Table",
      category: "Dining",
      price: "₹28,999",
      priceNum: 28999,
      rating: 4.9,
      reviews: 76,
      tag: "NEW ARRIVAL",
      description:
        "Seats 6 to 8 comfortably. Hand-rubbed organic oil finish brings out rich, swirling walnut wood grains.",
      dimensions: '78"L x 38"W x 30"H',
      materials: "100% Solid American Walnut, Steel reinforced joints",
      colors: [
        {
          name: "Warm Walnut",
          hex: "#5a3d28",
          image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
        },
        {
          name: "Natural Ash Blonde",
          hex: "#d8be9b",
          image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
        },
      ],
    },
    {
      id: 4,
      name: "Serene Platform Bed Frame",
      category: "Bedroom",
      price: "₹36,999",
      priceNum: 36999,
      rating: 5.0,
      reviews: 152,
      tag: "POPULAR",
      description:
        "Noise-free Japanese joinery platform bed with cushioned acoustic headboard for rejuvenating sleep.",
      dimensions: 'King: 84"L x 80"W x 42"H',
      materials: "Solid Appalachian Pine, Wool blend padded headboard",
      colors: [
        {
          name: "Honey Warm Oak",
          hex: "#c69255",
          image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        },
        {
          name: "Nordic Luxe Grey",
          hex: "#8c8f94",
          image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
        },
        {
          name: "Boho Cream Linen",
          hex: "#dfd3c3",
          image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
        },
      ],
    },
    {
      id: 5,
      name: "Sculptural Oak & Marble Coffee Table",
      category: "Living Room",
      price: "₹9,999",
      priceNum: 9999,
      rating: 4.7,
      reviews: 63,
      tag: "FEATURED",
      description:
        "Soft organic pill-shaped silhouette. Smooth beveled edges and moisture-resistant protective glaze.",
      dimensions: '44"W x 26"D x 16"H',
      materials: "Solid White Oak with Honed Travertine Base",
      colors: [
        {
          name: "Warm Walnut",
          hex: "#5c3d2e",
          image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800",
        },
        {
          name: "Natural Oak",
          hex: "#c8a27a",
          image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800",
        },
        {
          name: "Modern Ebony Marble",
          hex: "#2b2b2b",
          image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        },
      ],
    },
    {
      id: 6,
      name: "Ergonomic Executive Desk",
      category: "Office",
      price: "₹22,499",
      priceNum: 22499,
      rating: 4.8,
      reviews: 82,
      tag: "WORK LUXE",
      description:
        "Designed for modern leaders. Concealed cable raceway, dual-soft close drawers, and wireless charging surface.",
      dimensions: '60"W x 30"D x 30"H',
      materials: "European Walnut, Brushed Champagne Brass hardware",
      colors: [
        {
          name: "Natural Scandinavian Oak",
          hex: "#d2b48c",
          image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        },
        {
          name: "Warm Walnut & Brass",
          hex: "#5c3d2e",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        },
      ],
    },
  ];

  // Active color chosen per product card
  const [activeCardColors, setActiveCardColors] = useState({});

  const handleCardColorSelect = (productId, colorObj) => {
    setActiveCardColors((prev) => ({
      ...prev,
      [productId]: colorObj,
    }));
  };

  // 5. Filter & Sort Logic
  const filteredProducts = allProducts
    .filter((item) => {
      const matchCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.priceNum - b.priceNum;
      if (sortBy === "price-high") return b.priceNum - a.priceNum;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });

  // Re-run AOS refresh when products or filters change
  useEffect(() => {
    AOS.refresh();
  }, [selectedCategory, searchQuery, sortBy]);

  // 6. Festive Countdown Timer State (Hours, Minutes, Seconds)
  const [countdown, setCountdown] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 7. Consultation Form State
  const [consultForm, setConsultForm] = useState({
    name: "",
    email: "",
    room: "Living Room",
    style: "Modern Minimalist",
    date: "",
  });

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    triggerToast(
      `Thank you ${consultForm.name}! Your free 3D interior design session is confirmed.`
    );
    setConsultForm({
      name: "",
      email: "",
      room: "Living Room",
      style: "Modern Minimalist",
      date: "",
    });
  };

  return (
    <div className="furni-page">
      {/* Ambient Radial Glass Orbs */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-orb-1"></div>
        <div className="ambient-orb-2"></div>
        <div className="ambient-orb-3"></div>
      </div>

      {/* TOP ANNOUNCEMENT BAR (DESKTOP) */}

      {/* STICKY GLASS HEADER / NAVBAR */}
      <header className="furni-header">
        <div className="container">
          <div className="nav-container">
            {/* Logo */}
            <a href="#home" className="brand-logo">
              <div className="logo-badge">
                <i className="bi bi-house-heart"></i>
              </div>
              Furni<span>Craft.</span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="desktop-nav">
              <li>
                <a href="#home" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#features">Experience</a>
              </li>
              <li>
                <a href="#shop">Collection</a>
              </li>
              <li>
                <a href="#rooms">Shop </a>
              </li>
              <li>
                <a href="#offers">Diwali offers</a>
              </li>
              <li>
                <a href="#consultation">3D Design</a>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
            </ul>

            {/* Nav Action Buttons */}
            <div className="nav-actions">
              {/* Search Toggle */}
              <button
                className="nav-icon-btn d-none d-lg-flex"
                onClick={() => {
                  const el = document.getElementById("shop");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                title="Search Products"
                aria-label="Search"
              >
                <i className="bi bi-search"></i>
              </button>

              {/* Wishlist Button with Counter */}
              <button
                className="nav-icon-btn"
                onClick={() =>
                  triggerToast(
                    `You have ${wishlist.length} item(s) saved in your Wishlist!`
                  )
                }
                title="Wishlist"
                aria-label="Wishlist"
              >
                <i className="bi bi-heart"></i>
                {wishlist.length > 0 && (
                  <span className="nav-badge">{wishlist.length}</span>
                )}
              </button>

              {/* Cart Button with Counter */}
              <button
                className="nav-icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <i className="bi bi-bag"></i>
                {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              </button>

              {/* Consultation CTA */}
              <a href="#consultation" className="nav-cta-btn d-none d-sm-flex">
                <span>Free 3D Consult</span>
                <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH 3D GLASS SHOWCASE CARD (DESKTOP) */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Content */}
            <div className="col-lg-6" data-aos="fade-right">
              <span className="hero-tag">
                <i className="bi bi-stars"></i> ARCHITECTURAL FURNITURE COLLECTION
              </span>

              <h1 className="hero-title">
                Artisanal Furniture
                <br />
                <span>Crafted For Life</span>
                <br />
                In Every Shade.
              </h1>

              <p className="hero-subtitle">
                Elevate your living space with meticulously handcrafted designer
                furniture. Experience ergonomic sophistication, certified
                sustainable woods, and customizable plush velvet upholstery.
              </p>

              <div className="hero-button-group">
                <a href="#shop" className="btn-primary-glass">
                  <span>Explore Catalog</span>
                  <i className="bi bi-arrow-right"></i>
                </a>

                <a href="#rooms" className="btn-secondary-glass">
                  <span>Tour 3D Rooms</span>
                  <i className="bi bi-eye"></i>
                </a>
              </div>

              {/* Trust Metric Counters */}
              <div className="hero-metrics">
                <div className="metric-item">
                  <h4>15+</h4>
                  <p>Years Legacy</p>
                </div>
                <div className="metric-item">
                  <h4>250+</h4>
                  <p>Master Designs</p>
                </div>
                <div className="metric-item">
                  <h4>12K+</h4>
                  <p>Happy Homes</p>
                </div>
                <div className="metric-item">
                  <h4>4.9★</h4>
                  <p>Google Rating</p>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Glass Card */}
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="hero-glass-showcase">
                <div className="showcase-header">
                  <span className="showcase-badge">
                    <i className="bi bi-award-fill me-1"></i> MASTERPIECE OF THE MONTH
                  </span>
                  <div className="showcase-rating">
                    <i className="bi bi-star-fill"></i>
                    <span>4.9 (184 reviews)</span>
                  </div>
                </div>

                {/* Live Image Container */}
                <div className="showcase-img-container">
                  <img
                    key={heroSofa.image}
                    src={heroSofa.image}
                    alt={`${heroSofa.name} Luxury Sectional Sofa`}
                  />
                  <div className="showcase-floating-pill">
                    <i className="bi bi-palette2"></i>
                    <span>Upholstery:</span> {heroSofa.material}
                  </div>
                </div>

                {/* Interactive Color Switcher */}
                <div className="showcase-configurator">
                  <div className="configurator-title">
                    <span>Choose Colorway:</span>
                    <strong>{heroSofa.name}</strong>
                  </div>
                  <div className="color-swatch-list">
                    {heroSofaOptions.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`swatch-circle ${
                          heroSofa.name === c.name ? "active" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setHeroSofa(c)}
                        title={c.name}
                        aria-label={`Select ${c.name} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Details & Direct Add */}
                <div className="showcase-details">
                  <div>
                    <h3>Cloud Luxe Sectional</h3>
                    <p>Designed by Studio FurniCraft • Modular 4-Seater</p>
                  </div>
                  <div className="showcase-price-box">
                    <span>Special Price</span>
                    <h4>₹34,999</h4>
                  </div>
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="card-add-btn w-100 justify-content-center py-3"
                    onClick={() =>
                      handleAddToCart(allProducts[0], heroSofa)
                    }
                  >
                    <i className="bi bi-bag-plus"></i>
                    <span>Add Configured Sofa To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / VALUE PROPOSITION IN FROSTED GLASS CARDS */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="glass-feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-truck"></i>
                </div>
                <h4>White-Glove Delivery</h4>
                <p>
                  Complimentary in-room delivery, unpacking, and professional
                  furniture assembly by certified technicians.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="glass-feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-tree"></i>
                </div>
                <h4>100% Sustainable Teak</h4>
                <p>
                  FSC-certified kiln-dried hardwoods harvested responsibly to
                  prevent deforestation and preserve durability.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="glass-feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h4>10-Year Warranty</h4>
                <p>
                  Built to withstand generations. Comprehensive coverage for solid
                  frames, suspension, and joinery.
                </p>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="glass-feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <h4>30-Day In-Home Trial</h4>
                <p>
                  Live with your new furniture in your own lighting and decor. Easy,
                  hassle-free pickup and full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CATALOG SECTION (DESKTOP TOOLBAR & GLASS CARDS) */}
      <section className="shop-section" id="shop">
        <div className="container">
          {/* Section Header */}
          <div className="section-header-centered" data-aos="fade-up">
            <span className="section-label">CURATED COLLECTION</span>
            <h2 className="section-title">
              Designed For Comfort, <span>Shaped By Art.</span>
            </h2>
            <p className="section-desc">
              Explore best-selling living room sofas, ergonomic accent chairs,
              hand-rubbed dining tables, and plush master beds in rich custom
              colorways.
            </p>
          </div>

          {/* Desktop Filter Toolbar */}
          <div className="desktop-filter-toolbar" data-aos="fade-up">
            {/* Category Pills */}
            <div className="filter-pills">
              {["All", "Living Room", "Bedroom", "Dining", "Office"].map(
                (cat) => (
                  <button
                    key={cat}
                    className={`filter-pill-btn ${
                      selectedCategory === cat ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Search & Sort Controls */}
            <div className="filter-toolbar-right">
              <div className="search-input-wrapper">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search furniture"
                />
              </div>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid with Glass Cards */}
          <div className="row g-4">
            {filteredProducts.map((product, idx) => {
              const activeColor =
                activeCardColors[product.id] ||
                (product.colors ? product.colors[0] : null);
              const cardImage = activeColor?.image || product.image;
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  className="col-lg-4 col-md-6"
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={(idx % 3) * 120}
                >
                  <div className="product-glass-card">
                    {/* Image Area with Actions */}
                    <div className="card-img-wrapper">
                      <img
                        key={cardImage}
                        src={cardImage}
                        alt={`${product.name} in ${
                          activeColor?.name || "Standard"
                        }`}
                        loading="lazy"
                      />

                      <span className="card-tag">{product.tag}</span>

                      {/* Wishlist Button */}
                      <button
                        className={`card-wishlist-btn ${
                          isWishlisted ? "active" : ""
                        }`}
                        onClick={() =>
                          handleToggleWishlist(product.id, product.name)
                        }
                        title={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        aria-label="Wishlist"
                      >
                        <i
                          className={`bi ${
                            isWishlisted ? "bi-heart-fill" : "bi-heart"
                          }`}
                        ></i>
                      </button>

                      {/* Quick View Button */}
                      <button
                        className="card-quick-view-btn"
                        onClick={() => setQuickViewProduct(product)}
                      >
                        <i className="bi bi-eye"></i>
                        <span>Quick View</span>
                      </button>
                    </div>

                    {/* Card Content Details */}
                    <div className="card-content">
                      <div className="card-meta-row">
                        <span className="card-category">
                          {product.category}
                        </span>
                        <div className="card-rating">
                          <i className="bi bi-star-fill"></i>
                          <span>
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h4 className="card-title">{product.name}</h4>

                      {/* Interactive Color Swatch Selector */}
                      {product.colors && (
                        <div className="card-color-selector">
                          <span className="swatch-name-text">
                            Color:{" "}
                            <strong>
                              {activeColor?.name || product.colors[0].name}
                            </strong>
                          </span>
                          <div className="color-swatch-list">
                            {product.colors.map((c) => (
                              <button
                                key={c.name}
                                type="button"
                                className={`swatch-circle ${
                                  activeColor?.name === c.name ? "active" : ""
                                }`}
                                style={{ backgroundColor: c.hex }}
                                onClick={() =>
                                  handleCardColorSelect(product.id, c)
                                }
                                title={c.name}
                                aria-label={`Select ${c.name} color`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price & Add to Cart */}
                      <div className="card-footer-row">
                        <div className="card-price-box">
                          <h5>{product.price}</h5>
                        </div>

                        <button
                          className="card-add-btn"
                          onClick={() => handleAddToCart(product, activeColor)}
                        >
                          <i className="bi bi-bag-plus"></i>
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHOP BY ROOM IN FROSTED GLASS CARDS (DESKTOP) */}
      <section className="room-showcase-section" id="rooms">
        <div className="container">
          <div className="section-header-centered" data-aos="fade-up">
            <span className="section-label">INSPIRING SPACES</span>
            <h2 className="section-title">
              Curate Your Home, <span>Room By Room.</span>
            </h2>
            <p className="section-desc">
              Browse cohesive designer room packages styled by award-winning
              interior architects.
            </p>
          </div>

          <div className="row g-4">
            {/* Room 1 */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="room-glass-card">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000"
                  alt="Living Room Lounge Collection"
                />
                <div className="room-glass-overlay">
                  <span>COLLECTION 01</span>
                  <h3>The Warm Sunlit Living Lounge</h3>
                  <p>
                    Harmonious sectional sofas, marble organic coffee tables, and
                    sculptural ambient floor lighting.
                  </p>
                  <a href="#shop" className="room-link-btn">
                    <span>Shop 12 Living Pieces</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Room 2 */}
            <div className="col-lg-6" data-aos="fade-left">
              <div className="room-glass-card">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000"
                  alt="Master Bedroom Sanctuary"
                />
                <div className="room-glass-overlay">
                  <span>COLLECTION 02</span>
                  <h3>The Sanctuary Master Bedroom</h3>
                  <p>
                    Acoustic upholstered king beds, floating nightstands, and
                    natural breathable Belgian linen drapery.
                  </p>
                  <a href="#shop" className="room-link-btn">
                    <span>Shop 8 Bedroom Pieces</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Room 3 */}
            <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
              <div className="room-glass-card">
                <img
                  src="https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000"
                  alt="Artisan Dining Hall"
                />
                <div className="room-glass-overlay">
                  <span>COLLECTION 03</span>
                  <h3>The Artisan Dining Suite</h3>
                  <p>
                    Solid American walnut dining tables paired with ergonomic
                    brass-accented velvet dining chairs.
                  </p>
                  <a href="#shop" className="room-link-btn">
                    <span>Shop 9 Dining Pieces</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Room 4 */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
              <div className="room-glass-card">
                <img
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000"
                  alt="Executive Workspace Studio"
                />
                <div className="room-glass-overlay">
                  <span>COLLECTION 04</span>
                  <h3>The Executive Creative Studio</h3>
                  <p>
                    Solid hardwood executive desks, wire-management hubs, and
                    lumbar-cushioned Nordic accent chairs.
                  </p>
                  <a href="#shop" className="room-link-btn">
                    <span>Shop 6 Office Pieces</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVE FLASH SALE & LIVE COUNTDOWN (GLASSMORPHISM) */}
      <section className="festive-promo-section" id="offers">
        <div className="container">
          <div className="festive-glass-container" data-aos="zoom-in">
            <div className="festive-glow-ring"></div>

            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="festive-label">
                  <i className="bi bi-stars"></i> GRAND DIWALI & HOLIDAY SALE
                </span>

                <h2 className="festive-title">
                  This Season, Bring Home
                  <br />
                  <span>Extraordinary Luxury.</span>
                </h2>

                <p className="festive-desc">
                  Enjoy flat 30% to 50% festive discounts on all custom sectionals,
                  dining suites, and handcrafted master beds. Plus free
                  white-glove installation nationwide.
                </p>

                {/* Live Countdown Box Grid */}
                <div className="countdown-grid">
                  <div className="countdown-box">
                    <h3>{String(countdown.hours).padStart(2, "0")}</h3>
                    <span>Hours</span>
                  </div>
                  <div className="countdown-box">
                    <h3>{String(countdown.minutes).padStart(2, "0")}</h3>
                    <span>Mins</span>
                  </div>
                  <div className="countdown-box">
                    <h3>{String(countdown.seconds).padStart(2, "0")}</h3>
                    <span>Secs</span>
                  </div>
                </div>

                <div className="d-flex gap-3 flex-wrap">
                  <a href="#shop" className="btn-primary-glass">
                    <span>Shop Festive Offers</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </a>

                  <button
                    className="btn-secondary-glass"
                    onClick={() => {
                      navigator.clipboard?.writeText("FESTIVE50");
                      triggerToast("Coupon code 'FESTIVE50' copied to clipboard!");
                    }}
                  >
                    <i className="bi bi-copy"></i>
                    <span>Copy Code: FESTIVE50</span>
                  </button>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="festive-img-showcase">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000"
                    alt="Festive Luxury Living Room"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM 3D INTERIOR DESIGN CONSULTATION (GLASS FORM) */}
      <section className="consultation-section" id="consultation">
        <div className="container">
          <div className="consultation-glass-card" data-aos="fade-up">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <span className="section-label">COMPLIMENTARY CONCIERGE</span>
                <h2 className="section-title">
                  Schedule A Free <span>3D Room Plan.</span>
                </h2>
                <p className="section-desc">
                  Collaborate with our in-house interior architects. We'll map your
                  floor plan in 3D, calculate custom dimensions, and suggest fabric
                  color palettes that complement your home's natural light.
                </p>

                <div className="mt-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className="bi bi-check2-circle text-warning fs-4"></i>
                    <span>Photorealistic 3D spatial render within 48 hours</span>
                  </div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className="bi bi-check2-circle text-warning fs-4"></i>
                    <span>Complimentary fabric & wood finish swatch kit</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-check2-circle text-warning fs-4"></i>
                    <span>Zero commitment, 100% free consultation</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <form onSubmit={handleConsultSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="glass-input"
                      placeholder="e.g. Arun Sharma"
                      required
                      value={consultForm.name}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="glass-input"
                      placeholder="arun@example.com"
                      required
                      value={consultForm.email}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">
                      Select Space
                    </label>
                    <select
                      className="glass-input"
                      value={consultForm.room}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, room: e.target.value })
                      }
                    >
                      <option value="Living Room">Living Room</option>
                      <option value="Master Bedroom">Master Bedroom</option>
                      <option value="Dining Room">Dining Room</option>
                      <option value="Home Office">Home Office</option>
                      <option value="Full Villa">Entire Home / Villa</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-muted">
                      Aesthetic Style
                    </label>
                    <select
                      className="glass-input"
                      value={consultForm.style}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, style: e.target.value })
                      }
                    >
                      <option value="Modern Minimalist">Modern Minimalist</option>
                      <option value="Warm Scandinavian">Warm Scandinavian</option>
                      <option value="Japandi Organic">Japandi Organic</option>
                      <option value="Mid-Century Modern">Mid-Century Modern</option>
                      <option value="Royal Classic Luxury">Royal Classic Luxury</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold small text-muted">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="glass-input"
                      required
                      value={consultForm.date}
                      onChange={(e) =>
                        setConsultForm({ ...consultForm, date: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-12 mt-4">
                    <button type="submit" className="btn-primary-glass w-100 justify-content-center">
                      <i className="bi bi-calendar2-check"></i>
                      <span>Confirm 3D Design Consultation</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS IN FROSTED GLASS CARDS */}
      <section className="testimonials-section" id="reviews">
        <div className="container">
          <div className="section-header-centered" data-aos="fade-up">
            <span className="section-label">CLIENT VOICES</span>
            <h2 className="section-title">
              Loved By Homeowners, <span>Admired By Designers.</span>
            </h2>
            <p className="section-desc">
              Over 12,000 homes transformed across the country. Read authentic
              feedback from verified patrons.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-up">
              <div className="glass-review-card">
                <div className="review-stars">★★★★★</div>
                <h4 className="review-quote">
                  "The Cloud Sofa exceeded all our expectations."
                </h4>
                <p className="review-text">
                  "Ordering online was seamless. The swatches arrived in 2 days, and
                  the Navy Blue Velvet is breathtaking under warm indoor lighting.
                  The delivery team assembled everything in 20 minutes!"
                </p>
                <div className="reviewer-profile">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                    alt="Priya Sundaram"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h5>Priya Sundaram</h5>
                    <span>Bengaluru • Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="glass-review-card">
                <div className="review-stars">★★★★★</div>
                <h4 className="review-quote">
                  "Architectural grade joinery & finish."
                </h4>
                <p className="review-text">
                  "As an architect, I scrutinize furniture joints, wood grain, and
                  cushion resilience. The Artisan Walnut Dining Table is solid,
                  stable, and feels like an heirloom piece."
                </p>
                <div className="reviewer-profile">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                    alt="Vikram Malhotra"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h5>Vikram Malhotra</h5>
                    <span>Mumbai • Interior Architect</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="glass-review-card">
                <div className="review-stars">★★★★★</div>
                <h4 className="review-quote">
                  "The free 3D design consultation was gold."
                </h4>
                <p className="review-text">
                  "FurniCraft’s designer showed us a virtual 3D mockup of our exact
                  living room dimensions. That gave us the confidence to pick the
                  Cognac leather chair, and it looks stunning!"
                </p>
                <div className="reviewer-profile">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
                    alt="Ananya Roy"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h5>Ananya Roy</h5>
                    <span>Delhi NCR • Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RICH DESKTOP FOOTER */}
      <footer className="furni-footer">
        <div className="container">
          <div className="row g-5">
            {/* Column 1: Brand Info */}
            <div className="col-lg-4">
              <a href="#home" className="brand-logo text-white">
                <div className="logo-badge">
                  <i className="bi bi-house-heart"></i>
                </div>
                Furni<span className="text-warning">Craft.</span>
              </a>
              <p className="footer-brand-desc">
                FurniCraft designs and crafts museum-grade modern furniture,
                combining sustainable hardwoods with timeless ergonomic comfort.
                Every piece tells an enduring story.
              </p>
              <div className="footer-social-links">
                <a
                  href="#home"
                  className="social-icon-btn"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#home"
                  className="social-icon-btn"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#home"
                  className="social-icon-btn"
                  aria-label="Pinterest"
                >
                  <i className="bi bi-pinterest"></i>
                </a>
                <a
                  href="#home"
                  className="social-icon-btn"
                  aria-label="YouTube"
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-2 col-6">
              <h5 className="footer-col-title">Categories</h5>
              <ul className="footer-links">
                <li>
                  <a href="#shop">Sectional Sofas</a>
                </li>
                <li>
                  <a href="#shop">Lounge Chairs</a>
                </li>
                <li>
                  <a href="#shop">Solid Walnut Dining</a>
                </li>
                <li>
                  <a href="#shop">Platform Beds</a>
                </li>
                <li>
                  <a href="#shop">Ergonomic Desks</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care */}
            <div className="col-lg-2 col-6">
              <h5 className="footer-col-title">Concierge</h5>
              <ul className="footer-links">
                <li>
                  <a href="#consultation">Book 3D Design</a>
                </li>
                <li>
                  <a href="#features">10-Year Warranty</a>
                </li>
                <li>
                  <a href="#features">30-Day Home Trial</a>
                </li>
                <li>
                  <a href="#home">Shipping & Returns</a>
                </li>
                <li>
                  <a href="#home">Care Guide</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div className="col-lg-4">
              <h5 className="footer-col-title">Stay In The Circle</h5>
              <p className="text-white-50 small mb-3">
                Subscribe for private showcase invitations, editorial interior
                trends, and VIP festive preview codes.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerToast(
                    "Welcome to the FurniCraft Collector Circle! Check your inbox."
                  );
                }}
                className="d-flex gap-2"
              >
                <input
                  type="email"
                  className="glass-input"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn-primary-glass py-2 px-4">
                  Join
                </button>
              </form>
              <div className="mt-3 text-white-50 small">
                <i className="bi bi-shield-lock me-1"></i> No spam. Unsubscribe
                anytime.
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom">
            <div>
              © 2026 FurniCraft Design Studios Pvt Ltd. All rights reserved.
            </div>
            <div className="d-flex gap-3">
              <a href="#home" className="text-white-50 text-decoration-none">
                Privacy Policy
              </a>
              <a href="#home" className="text-white-50 text-decoration-none">
                Terms of Service
              </a>
              <a href="#home" className="text-white-50 text-decoration-none">
                Sustainability Commitment
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
          INTERACTIVE CART SLIDE-OUT DRAWER (GLASSMORPHISM)
          ========================================================================== */}
      {isCartOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="cart-drawer">
            <div className="drawer-header">
              <h4>
                Your Shopping Bag (
                {cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h4>
              <button
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart drawer"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="drawer-body">
              {/* Free Shipping Progress Indicator */}
              <div className="free-shipping-progress">
                <p>
                  {cartSubtotal >= freeShippingThreshold ? (
                    <span>
                      <i className="bi bi-check-circle-fill text-success me-1"></i>{" "}
                      You have unlocked Free White-Glove Installation!
                    </span>
                  ) : (
                    <span>
                      Add ₹
                      {(freeShippingThreshold - cartSubtotal).toLocaleString()}{" "}
                      more to qualify for Free In-Room Assembly!
                    </span>
                  )}
                </p>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${freeShippingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-bag-x fs-1 text-muted"></i>
                  <h5 className="mt-3">Your shopping bag is empty</h5>
                  <p className="text-muted small">
                    Explore our curated collection and add pieces you love!
                  </p>
                  <button
                    className="btn-primary-glass mt-2"
                    onClick={() => {
                      setIsCartOpen(false);
                      document
                        .getElementById("shop")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="cart-item-row"
                    key={`${item.id}-${item.color}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <h5>{item.name}</h5>
                      <div className="cart-item-color">
                        Colorway: <strong>{item.color}</strong>
                      </div>
                      <div className="cart-qty-price">
                        <div className="qty-control">
                          <button
                            className="qty-btn"
                            onClick={() =>
                              handleUpdateQty(item.id, item.color, -1)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() =>
                              handleUpdateQty(item.id, item.color, 1)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="fw-bold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer with Checkout */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="drawer-subtotal">
                  <span>Subtotal:</span>
                  <h4>₹{cartSubtotal.toLocaleString()}</h4>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() => {
                    alert(
                      `Proceeding to checkout with ${cartCount} items totaling ₹${cartSubtotal.toLocaleString()}! Thank you for choosing FurniCraft.`
                    );
                    setIsCartOpen(false);
                  }}
                >
                  <i className="bi bi-shield-lock-fill"></i>
                  <span>Secure Checkout</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ==========================================================================
          QUICK VIEW MODAL (FROSTED GLASS MODAL)
          ========================================================================== */}
      {quickViewProduct && (
        <div
          className="drawer-backdrop d-flex align-items-center justify-content-center p-3"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="modal-glass-card container p-4"
            style={{ maxWidth: "860px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-icon"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <div
                  style={{
                    height: "380px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#f5f2eb",
                  }}
                >
                  <img
                    src={
                      activeCardColors[quickViewProduct.id]?.image ||
                      (quickViewProduct.colors
                        ? quickViewProduct.colors[0].image
                        : quickViewProduct.image)
                    }
                    alt={quickViewProduct.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <span className="section-label mb-1">
                  {quickViewProduct.category}
                </span>
                <h3 className="fw-bold mb-2">{quickViewProduct.name}</h3>

                <div className="d-flex align-items-center gap-2 mb-3 text-warning">
                  <i className="bi bi-star-fill"></i>
                  <span className="text-dark fw-bold">
                    {quickViewProduct.rating} ({quickViewProduct.reviews} customer
                    reviews)
                  </span>
                </div>

                <h4 className="fw-bold text-success mb-3">
                  {quickViewProduct.price}
                </h4>

                <p className="text-muted small mb-3">
                  {quickViewProduct.description}
                </p>

                <div className="mb-3 small">
                  <strong>Dimensions:</strong> {quickViewProduct.dimensions}
                  <br />
                  <strong>Materials:</strong> {quickViewProduct.materials}
                </div>

                {quickViewProduct.colors && (
                  <div className="mb-4">
                    <span className="swatch-name-text">
                      Selected Color:{" "}
                      <strong>
                        {activeCardColors[quickViewProduct.id]?.name ||
                          quickViewProduct.colors[0].name}
                      </strong>
                    </span>
                    <div className="color-swatch-list">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          className={`swatch-circle ${
                            (activeCardColors[quickViewProduct.id]?.name ||
                              quickViewProduct.colors[0].name) === c.name
                              ? "active"
                              : ""
                          }`}
                          style={{ backgroundColor: c.hex }}
                          onClick={() =>
                            handleCardColorSelect(quickViewProduct.id, c)
                          }
                          title={c.name}
                          aria-label={`Select ${c.name} color`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    className="btn-primary-glass w-100 justify-content-center"
                    onClick={() => {
                      handleAddToCart(
                        quickViewProduct,
                        activeCardColors[quickViewProduct.id]
                      );
                      setQuickViewProduct(null);
                      setIsCartOpen(true);
                    }}
                  >
                    <i className="bi bi-bag-plus"></i>
                    <span>Add To Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          FLOATING TOAST NOTIFICATION
          ========================================================================== */}
      {toastMessage && (
        <div className="furni-toast">
          <i className="bi bi-check-circle-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
