import axios from 'axios';

// Actions
export const getAllData = (page) => {
    return async (dispatch) => { 
        try {
            const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
            const response = await axios.get(url);
            
            let action = {
                type: 'getAllCharacters',
                payload: response.data
            };
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch characters", error);
        }
    }
};

// Initial State
const initialState = {
    data: [],
    error: null,
    totalPages: 1
};

// Reducer
export const characterReducer = (state = initialState, action) => {
    if (action.type === 'getAllCharacters') {
        return {
            ...state,
            data: action.payload.results,
            totalPages: action.payload.info.pages
        };
    }
    return state;
};
