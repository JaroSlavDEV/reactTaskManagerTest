import React, { useReducer } from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { SHOW_LOADER, FETCH_NOTES, ADD_NOTE, CHANGE_NOTE, REMOVE_NOTE, INITIALIZE_APP, SET_AUTHORIZE } from "../types"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false,
        auth: {},
        db: {},
        isAuthorized: null
    };

    const [state, dispatch] = useReducer(firebaseReducer, initialState);
    const showLoader = () => dispatch({ type: SHOW_LOADER });

    const initializeApp = async () => {
        const application = await app.initializeApp(firebaseConfig);
        const auth = await application.auth();
        const db = await application.firestore();
        const payload = { auth, db, currentUser: auth.currentUser };

        auth.onAuthStateChanged(function (user) {
            if (user) {
                const payload = user;

                dispatch({
                    type: SET_AUTHORIZE,
                    payload
                });

            } else {
                const payload = null;

                dispatch({
                    type: SET_AUTHORIZE,
                    payload
                });
            }
        });

        console.log()



        dispatch({
            type: INITIALIZE_APP,
            payload
        });
    }

    const fetchNotes = async () => {
        showLoader();

        try {
            const notesCollection = state.db.collection('notes').doc(state.auth.currentUser.email);

            notesCollection.onSnapshot(async docSnapshot => {
                const document = await notesCollection.get();
                const data = await document.data();
                const result = (data && data.notes) || [];

                const payload = Object.keys(result).map(key => {
                    return {
                        ...result[key],
                        id: result[key].date
                    }
                });

                dispatch({
                    type: FETCH_NOTES,
                    payload
                });
            });

        } catch (e) {
            console.log(e)
            throw new Error(e.message);
        }
    };

    const addNote = async title => {
        const noteToAdd = {
            title, date: new Date().toJSON()
        };

        try {
            const notesCollection = state.db.collection('notes').doc(state.auth.currentUser.email);

            const document = await notesCollection.get();
            const data = await document.data();
            const getResult = (data && data.notes) || [];
            await notesCollection.set({ notes: [...getResult, noteToAdd] });

            const payload = {
                ...noteToAdd,
                id: noteToAdd.date
            };

            dispatch({
                type: ADD_NOTE,
                payload
            });

        } catch (e) {
            console.log(e)
            throw new Error(e.message);
        }
    }

    const changeNote = async (id, title) => {
        const noteToChange = {
            title, date: id
        };

        try {
            const notesCollection = state.db.collection('notes').doc(state.auth.currentUser.email);

            const document = await notesCollection.get();
            const data = await document.data();
            const getResult = (data && data.notes) || [];
            const newResult = getResult.map(note => (note.date === noteToChange.date) ? noteToChange : note);
            await notesCollection.set({ notes: [...newResult] });

            const payload = {
                ...noteToChange,
                id: noteToChange.date
            };

            dispatch({
                type: CHANGE_NOTE,
                payload
            });

        } catch (e) {
            console.log(e)
            throw new Error(e.message);
        }
    }

    const removeNote = async id => {
        try {
            const notesCollection = state.db.collection('notes').doc(state.auth.currentUser.email);

            const document = await notesCollection.get();
            const data = await document.data();
            const getResult = (data && data.notes) || [];
            const newResult = getResult.filter(note => id !== note.date);
            await notesCollection.set({ notes: [...newResult] });

            dispatch({
                type: REMOVE_NOTE,
                payload: id
            });

        } catch (e) {
            console.log(e)
            throw new Error(e.message);
        }
    }

    const shareNote = async (title, receiver) => {
        const noteToAdd = {
            title, date: new Date().toJSON(), sender: state.auth.currentUser.email
        };

        try {
            const notesCollection = state.db.collection('notes').doc(receiver);

            const document = await notesCollection.get();
            const documentExist = document.exists;

            if (!documentExist || receiver === state.auth.currentUser.email) throw new Error('The email address is not in use by another account.');

            const data = await document.data();
            const getResult = (data && data.notes) || [];
            await notesCollection.set({ notes: [...getResult, noteToAdd] });

        } catch (e) {
            console.log(e)
            throw new Error(e.message);
        }
    }

    const login = async (email, password) => {
        try {
            await state.auth.signInWithEmailAndPassword(email, password);

        } catch (e) {
            throw new Error(e.message);
        }
    }

    const logout = async () => {
        try {
            await state.auth.signOut();

        } catch (e) {
            throw new Error(e.message);
        }
    }

    const signup = async (email, password) => {
        const noteFirst = {
            title: 'First note', date: new Date().toJSON()
        };

        try {
            await state.auth.createUserWithEmailAndPassword(email, password);
            await state.db.collection('notes').doc(state.auth.currentUser.email).set({ notes: [noteFirst] });

        } catch (e) {
            throw new Error(e.message);
        }
    }

    return (
        <FirebaseContext.Provider value={{ showLoader, fetchNotes, addNote, changeNote, removeNote, shareNote, initializeApp, login, logout, signup, loading: state.loading, notes: state.notes, isAuthorized: state.isAuthorized }}>
            {children}
        </FirebaseContext.Provider>
    )
}
