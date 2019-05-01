import { FETCH_POSTS, CREATE_POST } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    count: 0
};


export default function(state=initialState, action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                items: action.payload.posts,
                count: action.payload.count
            }
        case CREATE_POST: 
            return {
                ...state,
                item: action.payload
            }    
        default:
            return state;
    }
};