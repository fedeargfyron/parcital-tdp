import axios from 'axios'
const GET_USERS_REQUEST = 'GET_USERS'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAIL = 'GET_USERS_FAIL'

export const getUsersDisponibles = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_USERS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/usuarios/disponibles'
        })
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    usersDisponibles: null
}

export const getUsersDisponiblesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS_REQUEST: return{
            loading: true
        }
        case GET_USERS_SUCCESS: return{
            loading: false,
            usersDisponibles: action.payload
        }
        case GET_USERS_FAIL: return{
            loading: false,
            error: action.payload
        }
        default: return state
    }
} 

