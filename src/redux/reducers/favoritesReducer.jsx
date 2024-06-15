const initialState = {
    favorites: [],
  };
  
  export const ADD_FAVORITE = 'ADD_FAVORITE';
  export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
  
  export const addFavorite = (coinId) => ({
    type: ADD_FAVORITE,
    payload: coinId,
  });
  
  export const removeFavorite = (coinId) => ({
    type: REMOVE_FAVORITE,
    payload: coinId,
  });
  
  const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FAVORITE:
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case REMOVE_FAVORITE:
        return {
          ...state,
          favorites: state.favorites.filter((id) => id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  