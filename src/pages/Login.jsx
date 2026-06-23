import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const isValidEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please enter email and password");
            setMessageType("warning");
            return;
        }

        if (!isValidEmail) {
            setMessage("Enter a valid email address");
            setMessageType("danger");
            return;
        }

        try {

            const response = await axios.post(
                "https://connecthub-backend-4t3q.onrender.com/api/auth/login",
                {
                    email,
                    password,
                }
            );

            if (
                response.data.message ===
                "Login Successful"
            ) {

                localStorage.clear();

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                localStorage.setItem(
                    "userId",
                    response.data.id
                );

                localStorage.setItem(
                    "userCode",
                    response.data.userCode
                );

                localStorage.setItem(
                    "userName",
                    response.data.name
                );

                localStorage.setItem(
                    "userEmail",
                    response.data.email
                );

                setMessage(
                    "Login Successful! Redirecting..."
                );

                setMessageType("success");

                setTimeout(() => {\
                    setEmail("");
                    setPassword("");
                    navigate("/dashboard");
                }, 1500);

            } else {

                setMessage("Invalid Credentials");
                setMessageType("danger");

            }

        } catch (error) {

            setMessage(
                error.response?.data ||
                "Login Failed!"
            );

            setMessageType("danger");
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
                            "linear-gradient(135deg,#6366F1,#8B5CF6)"
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
                        Connect. Chat. Collaborate.
                    </p>
                </div>

                {/* Right Section */}
                <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center bg-light">

                    <div
                        className="card shadow border-0 p-4"
                        style={{
                            width: "100%",
                            maxWidth: "450px",
                            borderRadius: "20px"
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
                                Welcome Back 👋
                            </h2>

                            <p className="text-muted">
                                Login to your account
                            </p>
                        </div>
                        {message && (
                            <div
                                className={`alert alert-${messageType} alert-dismissible fade show`}
                                role="alert"
                            >
                                {message}

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setMessage("")}
                                ></button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    autoComplete="email"
                                    className={`form-control ${email && !isValidEmail
                                        ? "is-invalid"
                                        : email && isValidEmail
                                            ? "is-valid"
                                            : ""
                                        }`}
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <label htmlFor="email">
                                    <FiMail className="me-2" />
                                    Email Address
                                </label>

                                {email && !isValidEmail && (
                                    <div className="invalid-feedback">
                                        Enter a valid email
                                    </div>
                                )}
                            </div>

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
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2"
                            >
                                <FiLogIn className="me-2" />
                                Login
                            </button>

                            <p className="text-center mt-3">
                                Don't have an account?
                                <Link
                                    to="/register"
                                    className="ms-1 text-decoration-none fw-bold"
                                >
                                    Register
                                </Link>
                            </p>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;