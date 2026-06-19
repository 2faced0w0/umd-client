import axios from 'axios';

// Actions
export const getAllData = (page) => {
    return async (dispatch) => { 
        try {
            const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
            const response = await axios.get(url);
            
            let action = {
                type: 'GET_ALL_CHARACTERS',
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
    loading: false,
    error: null,
    totalPages: 1
};

// Reducer
export const characterReducer = (state = initialState, action) => {
    if (action.type === 'GET_ALL_CHARACTERS') {
        return {
            ...state,
            data: action.payload.results,
            totalPages: action.payload.info.pages
        };
    }
    return state;
};
