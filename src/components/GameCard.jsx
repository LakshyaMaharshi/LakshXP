import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/slices/gamesSlice';
import { Heart, Star, Calendar, Gamepad2 } from 'lucide-react';

const GameCard = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favorites } = useAppSelector((state) => state.games);
  const isFavorited = favorites.some(fav => fav.id === game.id);

  const navigateToGameDetail = () => {
    navigate(`/games/${game.id}`);
  };

  const toggleGameFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(game));
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={navigateToGameDetail}
      aria-label={`Game: ${game.name}`}
    >
      <button 
        onClick={toggleGameFavorite}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm shadow-sm transition-all hover:scale-110 focus:outline-none"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`h-5 w-5 ${isFavorited ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400 hover:stroke-red-500'}`} 
          strokeWidth={isFavorited ? 1.5 : 2}
        />
      </button>

      <div className="relative aspect-video overflow-hidden">
        {game.background_image ? (
          <img 
            src={game.background_image} 
            alt={`${game.name} cover art`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-game.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Gamepad2 className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg line-clamp-2 text-gray-900">{game.name}</h3>
        
        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genres.slice(0, 3).map(genre => (
              <span 
                key={genre.id} 
                className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
                aria-label={`Genre: ${genre.name}`}
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {game.rating ? game.rating.toFixed(1) : 'N/A'}
              </span>
            </div>
            
            {game.released && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">
                  {formatReleaseDate(game.released)}
                </span>
              </div>
            )}
          </div>

          <button 
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigateToGameDetail();
            }}
            aria-label={`View details for ${game.name}`}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;