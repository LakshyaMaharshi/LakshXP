import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGames, setPageSize } from '../store/slices/gamesSlice';
import GameCard from './GameCard';

const GameList = () => {
  const dispatch = useAppDispatch();
  const { 
    titles, 
    isLoading, 
    hasError, 
    activePage, 
    maxPages,
    itemsPerPage,
    totalItems
  } = useAppSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: activePage, pageSize: itemsPerPage }));
  }, [dispatch, activePage, itemsPerPage]);

  const switchPage = (page) => {
    if (page >= 1 && page <= maxPages) {
      dispatch(fetchGames({ page, pageSize: itemsPerPage }));
    }
  };

  const updateItemsPerPage = (e) => {
    dispatch(setPageSize(Number(e.target.value)));
  };

  if (isLoading) return <div className="text-center py-10">Loading catalog...</div>;
  if (hasError) return <div className="text-center py-10 text-red-600">Error: {hasError}</div>;

  const paginationControls = () => {
    const buttons = [];
    const displayCount = Math.min(5, maxPages);
    const start = activePage <= 3 ? 1 : activePage > maxPages - 3 ? maxPages - 4 : activePage - 2;

    for (let i = 0; i < displayCount; i++) {
      const page = start + i;
      buttons.push(
        <button
          key={page}
          onClick={() => switchPage(page)}
          className={`px-3 py-1 border ${activePage === page ? 'bg-indigo-600 text-white' : 'bg-white'}`}
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
        <h1 className="text-3xl font-semibold">Game Catalog ({totalItems} items)</h1>
        <select
          value={itemsPerPage}
          onChange={updateItemsPerPage}
          className="border rounded-lg px-3 py-1 bg-white"
        >
          <option value={10}>10 items</option>
          <option value={20}>20 items</option>
          <option value={50}>50 items</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {titles.map((title) => (
          <GameCard key={title.id} game={title} />
        ))}
      </div>

      {maxPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => switchPage(1)}
            disabled={activePage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            First
          </button>
          <button
            onClick={() => switchPage(activePage - 1)}
            disabled={activePage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>
          {paginationControls()}
          <button
            onClick={() => switchPage(activePage + 1)}
            disabled={activePage === maxPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
          <button
            onClick={() => switchPage(maxPages)}
            disabled={activePage === maxPages}
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