import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const backgroundStyle = {
    backgroundImage: "url('./images/image2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    position: "relative",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    color: "#fff",
    zIndex: 10,
  };

  const navButtonStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const aboutSectionStyle = {
    padding: "50px 20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "20px",
    margin: "20px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const contactSectionStyle = {
    padding: "50px 20px",
    backgroundColor: "#e9ecef",
    borderRadius: "20px",
    margin: "20px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const mainTextStyle = {
    color: "#fff",               // White color for visibility
    fontSize: "36px",            // Larger text
    fontWeight: "bold",          // Bold text
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Improves readability on light backgrounds
    margin: "10px 0",
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div style={navStyle}>
        <h2>Child Vaccination System</h2>
        <div>
          <button style={navButtonStyle} onClick={() => scrollToSection(aboutRef)}>
            About Us
          </button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={navButtonStyle}>Login</button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <button style={navButtonStyle}>Register</button>
          </Link>
          <button style={navButtonStyle} onClick={() => scrollToSection(contactRef)}>
            Contact Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={backgroundStyle}>
        <h1 style={mainTextStyle}>Welcome to the Child Vaccination System</h1>
        <p style={mainTextStyle}>Manage and track vaccinations with ease.</p>
      </div>

      {/* About Us Section */}
      <div ref={aboutRef} style={aboutSectionStyle}>
        <h2>About Us</h2>
        <p>
          The Child Vaccination System is an easy-to-use digital platform created to assist
          parents, doctors, and healthcare administrators in effectively coordinating and
          tracking childhood vaccinations. Our vision is to ensure that every child receives
          their vaccinations on time, helping to protect children against preventable diseases
          and achieve a healthier future for all.
        </p>
      </div>

      {/* Contact Us Section */}
      <div ref={contactRef} style={contactSectionStyle}>
        <h2>Contact Us</h2>
        <p>Email: supportfromcvs@gmail.com</p>
        <p>Phone: 8762022215</p>
        <p>
          Address: BVB KLE Technological University, C-Lite Building, Vidyanagar, Hubballi
        </p>
      </div>
    </div>
  );
};

export default Home;
