import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { Container, Button, Alert } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';
import GameCard from './GameCard';

const Library = () => {
  const navigate = useNavigate();
  const { favorites } = useAppSelector((state) => state.games);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate(-1)}
            className="d-flex align-items-center"
          >
            <ArrowLeft size={20} className="me-2" />
            Back
          </Button>
          <h2 className="mb-0">My Game Library</h2>
          <div style={{ width: '100px' }}></div> {/* Spacer for alignment */}
        </div>

        {favorites.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your library is empty. Favorite some games to see them here!
          </Alert>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {favorites.map((game) => (
              <div key={game.id} className="col">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Library;