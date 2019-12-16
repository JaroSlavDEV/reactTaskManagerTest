import { SHOW_LOADER, FETCH_NOTES, ADD_NOTE, CHANGE_NOTE, REMOVE_NOTE, INITIALIZE_APP, SET_AUTHORIZE } from "../types"

const handlers = {
    [SHOW_LOADER]: state => ({ ...state, loading: true }),
    
    [FETCH_NOTES]: (state, { payload }) => ({...state, notes: payload, loading: false}),
    [ADD_NOTE]: (state, { payload }) => ({...state, notes: [...state.notes, payload]}),
    [CHANGE_NOTE]: (state, { payload }) => ({...state, notes: state.notes.map(note => (note.id === payload.id) ? payload : note)}),
    [REMOVE_NOTE]: (state, { payload }) => ({...state, notes: state.notes.filter(note => note.id !== payload)}),
    
    [INITIALIZE_APP]: (state, {payload}) => ({...state, auth: payload.auth, db: payload.db}),
    [SET_AUTHORIZE]: (state, {payload}) => ({...state, isAuthorized: payload}),

    DEFAULT: state => state
};

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}