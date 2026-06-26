import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (

        <div
            className="container-fluid"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#0d6efd,#6f42c1)"
            }}
        >

            <div className="container">

                {/* Navbar */}

                <nav className="navbar navbar-expand-lg py-3">

                    <div className="container-fluid">

                        <h2 className="navbar-brand fw-bold text-white mb-0">
                            ConnectHub
                        </h2>

                    </div>

                </nav>

                {/* Hero Section */}

                <div
                    className="row align-items-center"
                    style={{
                        minHeight: "85vh"
                    }}
                >

                    {/* Left Side */}

                    <div className="col-lg-6 text-center text-lg-start">

                        <h1 className="display-3 fw-bold text-white">
                            Welcome to
                            <br />
                            ConnectHub
                        </h1>

                        <p className="lead text-light mt-4">
                            Chat with friends,
                            share memories,
                            stay connected,
                            and build your own
                            social network experience.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-center justify-content-lg-start">

                            <button
                                className="btn btn-light btn-lg"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>

                            <button
                                className="btn btn-outline-light btn-lg"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6 text-center mt-5 mt-lg-0">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                            alt="ConnectHub"
                            className="img-fluid"
                            style={{
                                maxWidth: "450px",
                                width: "100%"
                            }}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Home;