import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '07aa5d39090f4c97a6eb31d3a93db9d5';
const BASE_URL = 'https://api.rawg.io/api';

// Mapping constants for filters
const GENRE_MAPPING = {
  'Action': 4,
  'Adventure': 3,
  'RPG': 5,
  'Strategy': 10,
  'Shooter': 2,
  'Sports': 15
};

const PLATFORM_MAPPING = {
  'PC': 4,
  'PlayStation': 18,
  'Xbox': 1,
  'Nintendo': 7,
  'Mobile': 3
};

const RATING_MAPPING = {
  '4+': '80,100',
  '3+': '50,79',
  '2+': '1,49'
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        pageSize = 20,
        search = '',
        filters = {}
      } = params;

      let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
      
      // Handle search parameters
      if (search) {
        url += `&search=${encodeURIComponent(search.trim())}`;
        if (filters.searchPrecise) url += '&search_precise=true';
        
        // When searching, ignore other filters unless explicitly kept
        if (!filters.keepFiltersOnSearch) {
          const response = await axios.get(url);
          return {
            results: response.data.results,
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
            currentPage: page,
            pageSize,
            searchQuery: search,
            filters: {
              ...filters,
              genres: [],
              platforms: [],
              ratings: []
            }
          };
        }
      }

      // Handle genre filters
      if (filters.genres?.length > 0) {
        url += `&genres=${filters.genres.map(genre => GENRE_MAPPING[genre]).join(',')}`;
      }

      // Handle platform filters
      if (filters.platforms?.length > 0) {
        url += `&platforms=${filters.platforms.map(platform => PLATFORM_MAPPING[platform]).join(',')}`;
      }

      // Handle rating filters
      if (filters.ratings?.length > 0) {
        url += `&metacritic=${RATING_MAPPING[filters.ratings[0]]}`;
      }

      // Handle ordering
      if (filters.ordering) {
        url += `&ordering=${filters.ordering}`;
      }

      const response = await axios.get(url);
      return {
        results: response.data.results,
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
        currentPage: page,
        pageSize,
        searchQuery: search,
        filters
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch games');
    }
  }
);

const initialState = {
  games: [],
  favorites: [],
  loading: false,
  error: null,
  count: 0,
  next: null,
  previous: null,
  currentPage: 1,
  pageSize: 20,
  totalPages: 0,
  searchQuery: '',
  filters: {
    genres: [],
    platforms: [],
    ratings: [],
    ordering: '-rating',
    searchPrecise: true,
    keepFiltersOnSearch: false
  }
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const gameIndex = state.favorites.findIndex(
        (game) => game.id === action.payload.id
      );
      if (gameIndex === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(gameIndex, 1);
      }
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.totalPages = Math.ceil(state.count / action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        genres: [],
        platforms: [],
        ratings: [],
        ordering: '-rating',
        searchPrecise: true,
        keepFiltersOnSearch: false
      };
      state.searchQuery = '';
    },
    setOrdering: (state, action) => {
      state.filters.ordering = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.currentPage = action.payload.currentPage;
        state.pageSize = action.payload.pageSize;
        state.totalPages = Math.ceil(action.payload.count / action.payload.pageSize);
        state.searchQuery = action.payload.searchQuery;
        state.filters = action.payload.filters;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  toggleFavorite, 
  setPageSize,
  setSearchQuery,
  setFilter,
  clearFilters,
  setOrdering
} = gamesSlice.actions;

export default gamesSlice.reducer;