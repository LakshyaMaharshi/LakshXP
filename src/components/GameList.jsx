import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGames, setPageSize } from '../store/slices/gamesSlice';
import GameCard from './GameCard';

const GameList = () => {
  const dispatch = useAppDispatch();
  const { 
    games, 
    loading, 
    error, 
    currentPage, 
    totalPages,  
    pageSize,    
    count        
  } = useAppSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const switchPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchGames({ page, pageSize }));
    }
  };

  const updateItemsPerPage = (e) => {
    dispatch(setPageSize(Number(e.target.value)));
  };

  if (loading) return <div className="text-center py-10">Loading catalog...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  const paginationControls = () => {
    const buttons = [];
    const displayCount = Math.min(5, totalPages);
    const start = currentPage <= 3 ? 1 : currentPage > totalPages - 3 ? totalPages - 4 : currentPage - 2;

    for (let i = 0; i < displayCount; i++) {
      const page = start + i;
      buttons.push(
        <button
          key={page}
          onClick={() => switchPage(page)}
          className={`px-3 py-1 border ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-white'}`}
        >
          {page}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Game Catalog ({count} items)</h1>
        <select
          value={pageSize}
          onChange={updateItemsPerPage}
          className="border rounded-lg px-3 py-1 bg-white"
        >
          <option value={10}>10 items</option>
          <option value={20}>20 items</option>
          <option value={50}>50 items</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(games || []).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => switchPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            First
          </button>
          <button
            onClick={() => switchPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>
          {paginationControls()}
          <button
            onClick={() => switchPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
          <button
            onClick={() => switchPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default GameList;