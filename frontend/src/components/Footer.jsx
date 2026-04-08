import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const subscribe = async () => {
  await fetch("http://localhost:5000/api/newsletter/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  alert("Subscribed successfully!");
};

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          {/* BRAND */}
          <div className="footer-section">
            <h2 className="footer-logo">FashionZone</h2>
            <p>Trendy fashion for Men, Women & Kids.</p>

            <div className="social-icons">
              <a href="https://www.facebook.com/share/1KZZSFrA3C/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.instagram.com/rajafashion_e_commerce?igsh=aHlveTQzeDJ3c3V4" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com/@lofieditz1-3kc?si=b9N0KtYdHqp2DiAz" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Orders</Link></li>

            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="footer-section">
            <h4>Subscribe</h4>
            <p>Get offers & updates</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email" />
              <button onClick={subscribe}>Subscribe</button>
            </div>
            <div className="payment-icons">
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height={'50em'} width={'50em'}/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height={'50em'} width={'50em'}/>
  <img src="/upi.png" height={'50em'} width={'50em'}/>
  <img src="/cod.png" height={'50em'} width={'50em'}/>
</div>
          </div>

          {/* MAP */}
          <div className="footer-section">
            <h4>Our Location</h4>
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed"
            />
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} FashionZone. All rights reserved.
        </div>
      </footer>

      {/* MOBILE STICKY FOOTER */}
      <div className="mobile-footer">
        <span>Home</span>
        <span>Wishlist</span>
        <span>Cart</span>
        <span>Orders</span>
      </div>
    </>
  );
}
