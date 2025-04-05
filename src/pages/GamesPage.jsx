import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import GameCard from '../components/GameCard';
import { fetchGames } from '../store/slices/gamesSlice';

const GamesPage = () => {
  const dispatch = useDispatch();
  const { games, loading, error, count, pageSize, currentPage } = useSelector(state => state.games);

  useEffect(() => {
    dispatch(fetchGames({
      page: currentPage,
      pageSize,
      filters: {}
    }));
  }, [dispatch, currentPage, pageSize]);

  if (loading) return (
    <Container className="py-4 text-center">
      <Spinner animation="border" />
    </Container>
  );
  
  if (error) return (
    <Container className="py-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container className="py-4">
      <h2 className="mb-4">Games ({count} total)</h2>
      <Row xs={1} md={2} lg={3} xl={3} className="g-4">
        {games.map(game => (
          <Col key={game.id}>
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GamesPage;