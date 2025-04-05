import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Calendar, Heart, Info, Image, Monitor, AlertTriangle, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/gamesSlice';

const API_KEY = '07aa5d39090f4c97a6eb31d3a93db9d5';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.games);
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  const isFavorite = favorites.some(fav => fav.id === Number(id));

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        
        const [gameResponse, screenshotsResponse] = await Promise.all([
          axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
        ]);

        setGame(gameResponse.data);
        setScreenshots(screenshotsResponse.data.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (game) {
      dispatch(toggleFavorite({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 max-w-md w-full">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            <h3 className="font-bold">Error Loading Game</h3>
          </div>
          <p className="mt-2 text-sm">{error}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6 max-w-md w-full">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            <h3 className="font-bold">Game Not Found</h3>
          </div>
          <p className="mt-2 text-sm">The requested game could not be found.</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Browse Games
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          <span className="font-medium">Back to Games</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={game.background_image || '/placeholder-game.jpg'}
              alt={game.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-game.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{game.name}</h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="text-yellow-400 mr-1" size={18} fill="currentColor" />
                      <span className="font-medium">{game.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Calendar className="mr-1" size={18} />
                      <span>{game.released || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleToggleFavorite}
                  className="flex items-center bg-black/30 backdrop-blur-sm hover:bg-black/40 px-4 py-2 rounded-full transition-colors"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart 
                    size={20} 
                    className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'} 
                  />
                  <span className="ml-2 font-medium">{isFavorite ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Info className="mr-2" size={16} />
                About
              </button>
              <button
                onClick={() => setActiveTab('screenshots')}
                className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'screenshots' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Image className="mr-2" size={16} />
                Screenshots
              </button>
              <button
                onClick={() => setActiveTab('platforms')}
                className={`flex items-center py-4 px-6 font-medium text-sm ${activeTab === 'platforms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Monitor className="mr-2" size={16} />
                Platforms
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Info className="mr-2 text-blue-500" size={20} />
                    Description
                  </h3>
                  <div 
                    className="prose max-w-none text-gray-700" 
                    dangerouslySetInnerHTML={{ __html: game.description || 'No description available.' }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={18} />
                      Genres
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.genres?.length > 0 ? (
                        game.genres.map(genre => (
                          <span key={genre.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {genre.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No genres listed</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Calendar className="mr-2 text-blue-500" size={18} />
                      Developers
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.developers?.length > 0 ? (
                        game.developers.map(dev => (
                          <span key={dev.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {dev.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No developers listed</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Image className="mr-2 text-blue-500" size={20} />
                  Screenshots
                </h3>
                {screenshots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {screenshots.map((screenshot) => (
                      <div key={screenshot.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img
                          src={screenshot.image}
                          alt={`${game.name} screenshot`}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 text-center rounded-lg">
                    <Image className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-500">No screenshots available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'platforms' && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Monitor className="mr-2 text-blue-500" size={20} />
                  Platforms
                </h3>
                {game.platforms?.length > 0 ? (
                  <div className="space-y-4">
                    {game.platforms.map((platform) => (
                      <div key={platform.platform.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium flex items-center">
                            <Monitor className="mr-2 text-gray-500" size={16} />
                            {platform.platform.name}
                          </span>
                          {platform.released_at && (
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="mr-1" size={14} />
                              {new Date(platform.released_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {platform.requirements?.minimum && (
                          <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                            <h5 className="font-semibold mb-1">Minimum Requirements:</h5>
                            <p>{platform.requirements.minimum}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 text-center rounded-lg">
                    <Monitor className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-500">No platform information available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;