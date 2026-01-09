import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EmployeeRegister() {
  const [employeeId, setEmployeeId] = useState(""); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (!employeeId || !name || !email || !password) {
      setMessage("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          employeeId: employeeId.trim(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password 
        }), 
      });

      let responseData;
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await res.json();
      } else {
        const text = await res.text();
        responseData = { message: text };
      }

      if (res.ok) {
        setMessage("Registration successful! Redirecting to login...");
        
        // Store employee info in localStorage
        localStorage.setItem("employeeId", employeeId);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        if (responseData.token) {
          localStorage.setItem("token", responseData.token);
        }

        // Redirect to login after short delay
        setTimeout(() => {
          navigate("/employee/login");
        }, 2000);
      } else {
        // Handle 400 Bad Request and other errors
        if (res.status === 400) {
          if (responseData.message && responseData.message.toLowerCase().includes("employee")) {
            setMessage("Employee ID already exists. Please use a different ID.");
          } else if (responseData.message && responseData.message.toLowerCase().includes("email")) {
            setMessage("Email address already registered. Please use a different email.");
          } else {
            setMessage(responseData.message || "Invalid registration data. Please check your information.");
          }
        } else {
          setMessage(responseData.message || "Registration failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
   <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #143240 0%, #1b262c 50%, #206c95 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  }}
>
  <div
    className="card shadow-lg border-0"
    style={{
      maxWidth: "1000px",
      width: "95%",
      borderRadius: "20px",
      overflow: "hidden",
      background: "#f9f9f9",
    }}
  >
    <div className="row g-0">
      {/* Left Side - Branding */}
      <div
        className="col-md-6 d-none d-md-flex"
        style={{
          background: "linear-gradient(135deg, #143240 0%, #206c95 100%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="p-5 d-flex flex-column justify-content-between h-100">
          <div>
            <h2 className="fw-bold mb-3" style={{ fontSize: "2rem", color: "#4ecdc4" }}>
              Join InsurAI
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "rgba(255,255,255,0.85)" }}>
              Transform your insurance experience with AI-powered, enterprise-grade solutions.
            </p>
          </div>
          <div>
            {/* Navigation Buttons for other logins */}
<div className="d-flex justify-content-center flex-direction-column mb-4" style={{ gap: "10px" }}>
  <Link
    to="/admin/login"
    className="btn fw-semibold"
    style={{
      background: "#206c95",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.background = "#143240")}
    onMouseLeave={(e) => (e.target.style.background = "#206c95")}
  >
    Admin Login
  </Link>

  <Link
    to="/agent/login"
    className="btn fw-semibold"
    style={{
      background: "#4ecdc4",
      color: "#143240",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.background = "#38b0ac")}
    onMouseLeave={(e) => (e.target.style.background = "#4ecdc4")}
  >
    Agent Login
  </Link>

  <Link
    to="/hr/login"
    className="btn fw-semibold"
    style={{
      background: "#143240",
      color: "#fff",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.background = "#206c95")}
    onMouseLeave={(e) => (e.target.style.background = "#143240")}
  >
    HR Login
  </Link>
</div>

          </div>
          <div>
            <ul className="list-unstyled">
              {[
                "AI-Powered Risk Assessment",
                "Enterprise-Grade Security",
                "Collaborative Team Features",
              ].map((feature, i) => (
                <li key={i} className="d-flex align-items-center mb-3">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(78, 205, 196, 0.2)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "12px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ecdc4"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "0.95rem" }}>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
              Trusted by 10,000+ insurance professionals worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="col-md-6">
        <div className="p-4 p-md-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#143240" }}>Create Account</h3>
            <p className="text-muted mb-0">Join InsurAI and start your journey</p>
          </div>

          {/* Alert Messages */}
          {message && (
            <div
              className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"} d-flex align-items-center`}
              style={{
                borderRadius: "10px",
                fontSize: "0.9rem",
                padding: "10px 16px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {[
              { label: "Employee ID", value: employeeId, setter: setEmployeeId, type: "text", icon: "user" },
              { label: "Full Name", value: name, setter: setName, type: "text", icon: "person" },
              { label: "Email Address", value: email, setter: setEmail, type: "email", icon: "envelope" },
            ].map((field, idx) => (
              <div className="mb-3" key={idx}>
                <label className="form-label fw-semibold" style={{ color: "#143240", fontSize: "0.9rem" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="form-control"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  required
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #ced4da",
                    padding: "12px 16px",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#206c95";
                    e.target.style.boxShadow = "0 0 0 3px rgba(32, 108, 149, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ced4da";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#143240", fontSize: "0.9rem" }}>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #ced4da",
                    padding: "12px 44px 12px 16px",
                    fontSize: "0.95rem",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#206c95";
                    e.target.style.boxShadow = "0 0 0 3px rgba(32, 108, 149, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ced4da";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute p-0 border-0"
                  style={{
                    top: "50%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    color: "#206c95",
                    opacity: 0.7,
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold"
              disabled={loading}
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #206c95, #143240)",
                border: "none",
                color: "white",
                padding: "14px",
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(32,108,149,0.3)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>Already have an account?</p>
            <Link to="/employee/login" className="fw-semibold" style={{ color: "#206c95" }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}