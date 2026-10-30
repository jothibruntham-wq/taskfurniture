import { useEffect } from "react";
import AOS from "aos";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/style/style.css";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 80,
    });
  }, []);

  const products = [
    {
      name: "Luxury Sofa",
      category: "Living Room",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      tag: "BEST SELLER",
    },
    {
      name: "Modern Lounge Chair",
      category: "Furniture",
      price: "₹12,499",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=800",
      tag: "NEW",
    },
    {
      name: "Wooden Coffee Table",
      category: "Living Room",
      price: "₹8,999",
      image:
        "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800",
      tag: "POPULAR",
    },
    {
      name: "Elegant Bedroom",
      category: "Bedroom",
      price: "₹32,999",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
      tag: "TRENDING",
    },
  ];

  return (
    <div className="furni-page">

      {/* NAVBAR */}

      <nav className="navbar navbar-expand-lg furni-nav">
        <div className="container">

          <a className="navbar-brand furni-logo" href="/">
            <i className="bi bi-house-heart-fill"></i>
            Furni<span>Craft.</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#furniMenu"
          >
            <i className="bi bi-list"></i>
          </button>

          <div
            className="collapse navbar-collapse"
            id="furniMenu"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#collections">Collections</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>

            <div className="nav-icons">
              <i className="bi bi-search"></i>
              <i className="bi bi-person"></i>
              <i className="bi bi-bag-heart"></i>

              <a href="#products" className="nav-shop-btn">
                Shop Now <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}

      <section className="furni-hero" id="home">

        <div className="hero-overlay"></div>

        <div className="container hero-container">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
              >

                <span className="hero-label">
                  <i className="bi bi-stars"></i>
                  PREMIUM FURNITURE COLLECTION
                </span>

                <h1>
                  Make Your Home
                  <br />
                  <span>Beautifully</span>
                  <br />
                  Different.
                </h1>

                <p>
                  Discover furniture that combines timeless elegance,
                  modern comfort and exceptional craftsmanship.
                  Make every corner of your home special.
                </p>

                <div className="hero-buttons">
                  <a href="#products" className="hero-btn">
                    Explore Collection
                    <i className="bi bi-arrow-up-right"></i>
                  </a>

                  <a href="#about" className="hero-outline-btn">
                    Discover More
                    <i className="bi bi-play-circle"></i>
                  </a>
                </div>

                <div className="hero-stats">

                  <div>
                    <h3>15+</h3>
                    <span>Years Experience</span>
                  </div>

                  <div>
                    <h3>250+</h3>
                    <span>Furniture Designs</span>
                  </div>

                  <div>
                    <h3>10k+</h3>
                    <span>Happy Customers</span>
                  </div>

                </div>

              </motion.div>
            </div>

            {/* GLASS CARD */}

            <div className="col-lg-5">

              <motion.div
                className="hero-glass-card"
                initial={{ opacity: 0, scale: 0.7, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.3, delay: 0.4 }}
                whileHover={{ y: -12 }}
              >

                <div className="glass-card-top">
                  <span>DESIGN OF THE MONTH</span>
                  <i className="bi bi-heart"></i>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
                  alt="Premium modern sofa"
                />

                <div className="glass-card-info">
                  <div>
                    <h4>Cloud Comfort Sofa</h4>
                    <p>Modern Luxury Collection</p>
                  </div>

                  <h3>₹24,999</h3>
                </div>

                <a href="#products" className="glass-explore">
                  Explore Product
                  <i className="bi bi-arrow-right"></i>
                </a>

              </motion.div>

            </div>

          </div>

        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <i className="bi bi-arrow-down"></i>
        </div>

      </section>

      {/* BRAND FEATURES */}

      <section className="features-section">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-3 col-6" data-aos="fade-up">
              <div className="feature-box">
                <i className="bi bi-truck"></i>
                <h5>Free Delivery</h5>
                <p>On orders above ₹5,000</p>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-box">
                <i className="bi bi-shield-check"></i>
                <h5>Quality Assured</h5>
                <p>Premium materials</p>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-box">
                <i className="bi bi-arrow-repeat"></i>
                <h5>Easy Returns</h5>
                <p>Simple return process</p>
              </div>
            </div>

            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-box">
                <i className="bi bi-headset"></i>
                <h5>24/7 Support</h5>
                <p>Here to help you</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section className="about-section" id="about">
        <div className="container">
          <div className="row align-items-center g-5">

            <div className="col-lg-6" data-aos="fade-right">

              <div className="about-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000"
                  alt="Elegant living room interior"
                />

                <div className="about-floating-card">
                  <h2>15+</h2>
                  <p>Years of creating beautiful spaces</p>
                </div>
              </div>

            </div>

            <div className="col-lg-6" data-aos="fade-left">

              <span className="section-label">ABOUT FURNICRAFT</span>

              <h2 className="section-heading">
                Furniture That
                <span> Tells Your Story.</span>
              </h2>

              <p className="about-description">
                We believe your home should reflect your personality.
                Our furniture is thoughtfully designed to bring comfort,
                creativity and elegance into your everyday life.
              </p>

              <div className="about-points">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Premium quality materials
                </div>
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Unique modern designs
                </div>
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Crafted for lasting comfort
                </div>
              </div>

              <a href="#products" className="dark-btn">
                Discover Our Story
                <i className="bi bi-arrow-up-right"></i>
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* COLLECTIONS */}

      <section className="collections-section" id="collections">

        <div className="container">

          <div className="section-title text-center" data-aos="fade-up">
            <span className="section-label">OUR COLLECTIONS</span>
            <h2 className="section-heading">
              Find Your Perfect <span>Style</span>
            </h2>
            <p>Beautiful furniture for every corner of your home.</p>
          </div>

          <div className="row g-4">

            <div className="col-md-4" data-aos="zoom-in">
              <div className="collection-card">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
                  alt="Living room collection"
                />
                <div className="collection-overlay">
                  <span>01 / COLLECTION</span>
                  <h3>Living Room</h3>
                  <a href="#products">Explore <i className="bi bi-arrow-up-right"></i></a>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="150">
              <div className="collection-card">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
                  alt="Bedroom collection"
                />
                <div className="collection-overlay">
                  <span>02 / COLLECTION</span>
                  <h3>Bedroom</h3>
                  <a href="#products">Explore <i className="bi bi-arrow-up-right"></i></a>
                </div>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="collection-card">
                <img
                  src="https://images.unsplash.com/photo-1499933374294-4584851497cc?w=800"
                  alt="Office furniture collection"
                />
                <div className="collection-overlay">
                  <span>03 / COLLECTION</span>
                  <h3>Workspace</h3>
                  <a href="#products">Explore <i className="bi bi-arrow-up-right"></i></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="products-section" id="products">

        <div className="container">

          <div className="products-heading" data-aos="fade-up">
            <div>
              <span className="section-label">OUR BEST SELLERS</span>
              <h2 className="section-heading">
                Popular <span>Products.</span>
              </h2>
            </div>

            <a href="#contact" className="view-all">
              View All Products <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>

          <div className="row g-4">

            {products.map((product, index) => (
              <div
                className="col-lg-3 col-md-6"
                key={product.name}
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >

                <motion.div
                  className="product-card"
                  whileHover={{ y: -12, rotateX: 2 }}
                  transition={{ duration: 0.3 }}
                >

                  <div className="product-image">
                    <img src={product.image} alt={product.name} />

                    <span className="product-tag">{product.tag}</span>

                    <button className="product-heart" aria-label="Add to wishlist">
                      <i className="bi bi-heart"></i>
                    </button>

                    <a href="#contact" className="quick-view">
                      Quick View <i className="bi bi-eye"></i>
                    </a>
                  </div>

                  <div className="product-details">
                    <span>{product.category}</span>
                    <h4>{product.name}</h4>

                    <div className="product-bottom">
                      <h5>{product.price}</h5>
                      <a href="#contact" aria-label="View product">
                        <i className="bi bi-arrow-up-right"></i>
                      </a>
                    </div>
                  </div>

                </motion.div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* GLASS PROMO SECTION */}

      <section className="promo-section">
        <div className="container">
          <motion.div
            className="promo-glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >

            <div className="row align-items-center">

              <div className="col-lg-7" data-aos="fade-right">
                <span className="promo-label">SPECIAL OFFER</span>

                <h2>
                  Create Your Dream
                  <br />
                  Home With <span>Style.</span>
                </h2>

                <p>
                  Upgrade your space with our exclusive furniture collection.
                  Get up to 30% off selected designs.
                </p>

                <a href="#products" className="promo-btn">
                  Shop The Sale
                  <i className="bi bi-arrow-up-right"></i>
                </a>
              </div>

              <div className="col-lg-5" data-aos="zoom-in">
                <img
                  className="promo-image"
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
                  alt="Modern luxury sofa"
                />
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL */}

      <section className="testimonial-section">
        <div className="container text-center" data-aos="fade-up">

          <span className="section-label">CUSTOMER LOVE</span>

          <h2 className="section-heading">
            What Our <span>Customers Say.</span>
          </h2>

          <div className="testimonial-card">

            <div className="testimonial-stars">
              ★★★★★
            </div>

            <h3>
              "Beautiful designs and amazing quality!"
            </h3>

            <p>
              FurniCraft completely transformed my living room.
              The quality, comfort and design are absolutely wonderful.
              I would definitely recommend them.
            </p>

            <div className="customer-info">
              <div className="customer-avatar">A</div>
              <div>
                <h5>Arun Kumar</h5>
                <span>Verified Customer</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT / NEWSLETTER */}

      <section className="newsletter-section" id="contact">
        <div className="container">

          <div className="newsletter-box" data-aos="zoom-in">

            <span className="section-label">STAY INSPIRED</span>

            <h2>
              Make Your Home
              <span> More Beautiful.</span>
            </h2>

            <p>
              Subscribe to receive our latest furniture collections,
              interior ideas and exclusive offers.
            </p>

            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
              />

              <button type="submit">
                Subscribe <i className="bi bi-arrow-right"></i>
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="furni-footer">

        <div className="container">

          <div className="row g-4">

            <div className="col-lg-4">
              <a className="footer-logo" href="/">
                <i className="bi bi-house-heart-fill"></i>
                Furni<span>Craft.</span>
              </a>

              <p>
                Creating beautiful spaces with premium furniture,
                modern designs and timeless comfort.
              </p>

              <div className="footer-social">
                <a href="#contact"><i className="bi bi-instagram"></i></a>
                <a href="#contact"><i className="bi bi-facebook"></i></a>
                <a href="#contact"><i className="bi bi-pinterest"></i></a>
                <a href="#contact"><i className="bi bi-twitter-x"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-6">
              <h5>Explore</h5>
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#products">Shop</a>
              <a href="#collections">Collections</a>
            </div>

            <div className="col-lg-3 col-6">
              <h5>Categories</h5>
              <a href="#collections">Living Room</a>
              <a href="#collections">Bedroom</a>
              <a href="#collections">Workspace</a>
              <a href="#products">Best Sellers</a>
            </div>

            <div className="col-lg-3">
              <h5>Contact Us</h5>
              <p><i className="bi bi-geo-alt"></i> Bengaluru, India</p>
              <p><i className="bi bi-envelope"></i> hello@furnicraft.com</p>
              <p><i className="bi bi-telephone"></i> +91 98765 43210</p>
            </div>

          </div>

          <div className="footer-bottom">
            <p>© 2026 FurniCraft. All Rights Reserved.</p>
            <p>Designed with <i className="bi bi-heart-fill"></i> for beautiful homes.</p>
          </div>

        </div>

      </footer>

    </div>
  );
}