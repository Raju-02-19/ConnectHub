import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Contacts from '../pages/Contacts';
import Calls from '../pages/Calls';
import Notifications from '../pages/Notifications';
import EditProfile from '../pages/EditProfile';
import NotFound from '../pages/NotFound';
import ChatInfo from '../pages/ChatInfo';
import Home from '../pages/Home';
import AchivedChats from '../pages/AchivedChats';
import Search from '../pages/Search';

import ProtectedRoute from '../ProtectedRoute';

export const AppRoutes = () => {

    return (

        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Routes */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/contacts"
                element={
                    <ProtectedRoute>
                        <Contacts />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/calls"
                element={
                    <ProtectedRoute>
                        <Calls />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-profile"
                element={
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat-info"
                element={
                    <ProtectedRoute>
                        <ChatInfo />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/achived"
                element={
                    <ProtectedRoute>
                        <AchivedChats />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/search"
                element={
                    <ProtectedRoute>
                        <Search />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );
};

export default AppRoutes;