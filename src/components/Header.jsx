import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Form, Button, Nav } from 'react-bootstrap';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { Gamepad2, Search, Filter, X, LogIn, Library } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { fetchGames, setFilter, clearFilters } from '../store/slices/gamesSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const filtersRef = useRef(null);

  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    platforms: [],
    ratings: []
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      dispatch(clearFilters());
      dispatch(setFilter({
        search: query,
        searchPrecise: true,
        ordering: '-rating'
      }));

      dispatch(fetchGames({
        page: 1,
        pageSize: 20,
        search: query,
        filters: {
          search: query,
          searchPrecise: true,
          ordering: '-rating'
        }
      }));

      setSearchQuery('');
      setShowSearch(false);
      navigate('/games');
    }
  };

  const handleFilterToggle = (type, value) => {
    setActiveFilters(prev => {
      const currentItems = [...prev[type]];
      const updatedItems = currentItems.includes(value)
        ? currentItems.filter(item => item !== value)
        : [...currentItems, value];

      return {
        ...prev,
        [type]: updatedItems
      };
    });
  };

  const applyFilters = () => {
    dispatch(setFilter({
      genres: activeFilters.genres,
      platforms: activeFilters.platforms,
      ratings: activeFilters.ratings,
      ordering: '-rating',
      search: '',
      searchPrecise: false
    }));

    dispatch(fetchGames({
      page: 1,
      pageSize: 20,
      filters: {
        genres: activeFilters.genres,
        platforms: activeFilters.platforms,
        ratings: activeFilters.ratings,
        ordering: '-rating'
      }
    }));

    setShowFilters(false);
    navigate('/games');
  };

  const clearAllFilters = () => {
    setActiveFilters({
      genres: [],
      platforms: [],
      ratings: []
    });

    dispatch(clearFilters());
    dispatch(fetchGames({
      page: 1,
      pageSize: 20
    }));
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
    if (filtersRef.current && !filtersRef.current.contains(event.target)) {
      setShowFilters(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch || showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch, showFilters]);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className={`py-2 ${isScrolled ? 'navbar-scrolled' : 'navbar-top'}`}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(33, 37, 41, 0.95)',
        transition: 'all 0.3s ease'
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center me-4"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="d-flex align-items-center"
          >
            <Gamepad2 className="me-2 text-primary" size={24} />
            <span className="fw-bold text-white">LakshXP</span>
          </motion.div>
        </Navbar.Brand>

        

        <div className="d-flex align-items-center order-lg-2 ms-auto">
          <div className="d-flex align-items-center gap-3">
            {/* Filter Button */}
            <div className="position-relative" ref={filtersRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`btn btn-link text-white p-2 ${(activeFilters.genres.length || activeFilters.platforms.length || activeFilters.ratings.length)
                    ? 'text-warning'
                    : ''
                  }`}
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Filters"
              >
                <Filter size={20} />
                {(activeFilters.genres.length || activeFilters.platforms.length || activeFilters.ratings.length) > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {activeFilters.genres.length + activeFilters.platforms.length + activeFilters.ratings.length}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="position-absolute end-0 mt-2 z-3 bg-dark border border-secondary rounded-3 p-3 shadow"
                    style={{ width: '300px' }}
                  >
                    <h6 className="text-white mb-3">Filter Games</h6>

                    <div className="mb-3">
                      <p className="text-muted mb-2">Genres</p>
                      <div className="d-flex flex-wrap gap-2">
                        {['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Sports'].map(genre => (
                          <Button
                            key={genre}
                            variant={activeFilters.genres.includes(genre) ? 'primary' : 'outline-secondary'}
                            size="sm"
                            onClick={() => handleFilterToggle('genres', genre)}
                          >
                            {genre}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-muted mb-2">Platforms</p>
                      <div className="d-flex flex-wrap gap-2">
                        {['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'].map(platform => (
                          <Button
                            key={platform}
                            variant={activeFilters.platforms.includes(platform) ? 'primary' : 'outline-secondary'}
                            size="sm"
                            onClick={() => handleFilterToggle('platforms', platform)}
                          >
                            {platform}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-muted mb-2">Rating</p>
                      <div className="d-flex flex-wrap gap-2">
                        {['4+', '3+', '2+'].map(rating => (
                          <Button
                            key={rating}
                            variant={activeFilters.ratings.includes(rating) ? 'primary' : 'outline-secondary'}
                            size="sm"
                            onClick={() => handleFilterToggle('ratings', rating)}
                          >
                            {rating} Stars
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={clearAllFilters}
                      >
                        Clear All
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={applyFilters}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <div className="position-relative" ref={searchRef}>
              {!showSearch ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-link text-white p-2"
                  onClick={() => setShowSearch(true)}
                  aria-label="Search"
                >
                  <Search size={20} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-link text-white p-2"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  aria-label="Close search"
                >
                  <X size={20} />
                </motion.button>
              )}

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="position-absolute end-0 mt-2 z-3 bg-dark border border-secondary rounded-3 p-2 shadow"
                    style={{ width: '300px' }}
                  >
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        type="search"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-dark text-white border-0"
                        autoFocus
                      />
                      <Button
                        variant="primary"
                        type="submit"
                        className="ms-2"
                      >
                        <Search size={18} />
                      </Button>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Button */}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline-light" className="d-flex align-items-center">
                  <LogIn size={18} className="me-2" />
                  <span className="d-none d-lg-inline">Sign In</span>
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
        <Navbar.Toggle aria-controls="navbar-nav" className="ms-2 border-0" />

        <Navbar.Collapse id="navbar-nav" className='block sm:hidden md:hidden lg:hidden' >
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/library"
              className="d-flex align-items-center text-white py-2  "
            >
              <div className='flex justify-center align-middle sm:hidden md:hidden lg:hidden' >
              <Library size={20} className="me-2" />
              Library
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;