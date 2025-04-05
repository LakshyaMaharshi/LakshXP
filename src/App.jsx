import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '@clerk/clerk-react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Library from './components/Library';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import GamesPage from './pages/GamesPage';
import Footer from './components/Footer';
import DevelopingPages from './pages/DevelopingPages';
import MouseFollower from './Animations/MouseFollower';


const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/sign-in" replace />;
};

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light mt-9 ">
      <MouseFollower />
      <Header />

      <Container fluid className="flex-grow-1">
        <Row className="gx-0">
        
          <Col
            md={3}
            lg={2}
            className="d-none d-md-block bg-white shadow-sm"
            style={{ minHeight: 'calc(100vh - 56px)' }}
          >
            <div className="position-sticky" style={{ top: '56px' }}>
              <Sidebar />
            </div>
          </Col>

          <Col xs={12} md={9} lg={10} className="p-4">
            <Routes>
              <Route path="/" element={<GameList />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/:id" element={<GameDetail />} />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                }
              />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/reviews" element={<DevelopingPages />} />
              <Route path="/settings" element={<DevelopingPages />} />
              </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
