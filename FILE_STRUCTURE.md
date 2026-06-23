# ConnectHub Project Structure

This document describes the current file and folder layout for the ConnectHub React + Vite application.

## Root files

- `package.json` - npm package configuration, scripts, and dependencies.
- `package-lock.json` - exact dependency tree lockfile.
- `vite.config.js` - Vite configuration file.
- `eslint.config.js` - ESLint configuration for the project.
- `index.html` - application HTML entry point.
- `README.md` - project description and setup information.
- `.gitignore` - ignored files and folders for Git.

## Public folder

- `public/` - static assets served directly by Vite.

## Source folder

- `src/` - main application source code.
  - `App.jsx` - root React component.
  - `main.jsx` - application entry point and React DOM render logic.
  - `App.css` - application-level CSS styles.
  - `index.css` - global CSS styles.
  - `assets/` - static asset files used by the app.
  - `Routes/` - application route definitions.
    - `AppRoutes.jsx` - configured app routes and route handling.
  - `components/` - shared UI components.
    - `BottomNav.jsx` - bottom navigation bar component.
    - `ChatBox.jsx` - chat message container component.
    - `ChatHeader.jsx` - header for chat views.
    - `ChatList.jsx` - list of chat conversations.
    - `Message.jsx` - individual chat message component.
    - `MessageInput.jsx` - input field for composing messages.
    - `ProfileModal.jsx` - user profile modal component.
    - `Sidebar.jsx` - main sidebar navigation component.
  - `services/` - application service utilities.
    - `api.js` - API request helper functions.
  - `pages/` - page views and top-level screens.
    - `AchivedChats.jsx` - archived chats page.
    - `Calls.jsx` - calls page.
    - `ChatInfo.jsx` - chat information page.
    - `Contacts.jsx` - contacts page.
    - `Dashboard.jsx` - main dashboard page.
    - `EditProfile.jsx` - edit profile page.
    - `Login.jsx` - login screen.
    - `NotFound.jsx` - 404 not found page.
    - `Notifications.jsx` - notifications page.
    - `Profile.jsx` - user profile page.
    - `Register.jsx` - registration screen.
    - `Search.jsx` - search page.
    - `Settings.jsx` - application settings page.
