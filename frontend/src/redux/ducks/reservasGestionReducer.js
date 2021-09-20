import axios from 'axios'

const GET_RESERVASGESTION_REQUEST = 'GET_RESERVASGESTION_REQUEST'
const GET_RESERVASGESTION_SUCCESS = 'GET_RESERVASGESTION_SUCCESS'
const GET_RESERVASGESTION_FAIL = 'GET_RESERVASGESTION_FAIL'

export const getReservasGestion = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_RESERVASGESTION_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: 'http://localhost:4000/api/reservas/gestion'
        })
        dispatch({
            type: GET_RESERVASGESTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_RESERVASGESTION_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    reservasGestion: null
}

export const getReservasGestionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RESERVASGESTION_REQUEST: return {
            loadingReservasGestion: true
        }
        case GET_RESERVASGESTION_SUCCESS: return {
            loadingReservasGestion: false,
            reservasGestion: action.payload
        }
        case GET_RESERVASGESTION_FAIL: return {
            loadingReservasGestion: false,
            errorReservasGestion: action.payload
        }
        default: return state
    }
    
}