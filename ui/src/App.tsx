import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./components/AuthComponent";
import './AppComponent.css';

const Header: React.FC = () => {
  const { token, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="title">Event Shuffle</h1>
        <nav className="header-nav">
          <div className="button-container">
            {!token ? (
              <>
                <Link to="/login" className="nav-button">
                  Login
                </Link>
                <Link to="/register" className="nav-button">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/events" className="home-button">
                  Home
                </Link>
                <span onClick={logout} className="logout">
                  Logout
                </span>
              </>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
};


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Login />;
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Header />
      <ToastContainer position="top-center"/>
      <main className="main">
        <Routes>
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event/:id" element={ <EventDetail /> }
          />
        </Routes>
      </main>
    </AuthProvider>
  </Router>
);

export default App;
