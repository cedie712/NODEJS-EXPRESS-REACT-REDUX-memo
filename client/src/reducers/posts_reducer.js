import { FETCH_POSTS, CREATE_POST, SET_POST_TO_DELETE, DELETE_POST, EMPTY_STATE_PROPS, UPDATE_POST } from '../actions/types';

const initialState = {
    items: [],
    item: null,
    count: 0,
    post_to_delete: null,
    post_splice: null,
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
        case UPDATE_POST: 
            return {
                ...state,
                // item: action.payload
            }   
        case SET_POST_TO_DELETE:
            return {
                ...state,
                post_to_delete: action.payload,
                post_splice: null,
            }
        case DELETE_POST:
            return {
                ...state,
                post_splice: action.payload
            }
        case EMPTY_STATE_PROPS:
            return {
                ...state,
                post_splice: action.payload,
                post_to_delete: action.payload,
                item: action.payload
            }    
        default:
            return state;
    }
};