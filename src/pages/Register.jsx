import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
} from "react-icons/fi";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      return;
    }

    if (formData.password !== formData.confirmPassword) {

      return;
    }

    try {
      const response = await axios.post(
        "https://connecthub-backend-4t3q.onrender.com/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      if (
        response.data.includes === "User Registered Successfully"
      ) {


        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");

      } else {

      }
    } catch (error) {
      console.error(error);


    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">

        {/* Left Section */}
        <div
          className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-white"
          style={{
            background:
              "linear-gradient(135deg,#6366F1,#8B5CF6)",
          }}
        >
          <img
            src="/icons.svg"
            alt="ConnectHub"
            width="120"
            className="mb-3"
          />

          <h1 className="fw-bold">ConnectHub</h1>

          <p className="fs-5">
            Join the future of communication
          </p>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center bg-light">

          <div
            className="card shadow border-0 p-4"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "20px",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="/icons.svg"
                alt="logo"
                width="80"
                className="d-lg-none mb-3"
              />

              <h2 className="fw-bold">
                Create Account 🚀
              </h2>

              <p className="text-muted">
                Register to get started
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Name */}

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FiUser />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FiMail />
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FiLock />
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>
              </div>

              {/* Confirm Password */}

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FiLock />
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Terms */}

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                />

                <label
                  className="form-check-label"
                  htmlFor="terms"
                >
                  I agree to the Terms &
                  Conditions
                </label>
              </div>

              {/* Register Button */}

              <button
                type="submit"
                className="btn btn-primary w-100 py-2"
              >
                <FiUserPlus className="me-2" />
                Create Account
              </button>

              <p className="text-center mt-3 mb-0">
                Already have an account?

                <Link
                  to="/login"
                  className="ms-1 text-decoration-none fw-bold"
                >
                  Login
                </Link>
              </p>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;