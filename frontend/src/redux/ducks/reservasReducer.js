import axios from 'axios'

const GET_RESERVAS_REQUEST = 'GET_RESERVAS_REQUEST'
const GET_RESERVAS_SUCCESS = 'GET_RESERVAS_SUCCESS'
const GET_RESERVAS_FAIL = 'GET_RESERVAS_FAIL'

export const getReservas = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_RESERVAS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/reservas'
        })
        dispatch({
            type: GET_RESERVAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_RESERVAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    reservas: null
}

export const getReservasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RESERVAS_REQUEST: return {
            loadingReservas: true
        }
        case GET_RESERVAS_SUCCESS: return {
            loadingReservas: false,
            reservas: action.payload
        }
        case GET_RESERVAS_FAIL: return {
            loadingReservas: false,
            errorReservas: action.payload
        }
        default: return state
    }
    
}