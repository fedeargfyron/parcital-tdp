import axios from 'axios'

const GET_OFERTAS_REQUEST = 'GET_OFERTAS_REQUEST'
const GET_OFERTAS_SUCCESS = 'GET_OFERTAS_SUCCESS'
const GET_OFERTAS_FAIL = 'GET_OFERTAS_FAIL'

export const getOfertas = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_OFERTAS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/ofertas'
        })
        dispatch({
            type: GET_OFERTAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_OFERTAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    ofertas: null
}

export const getOfertasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_OFERTAS_REQUEST: return {
            loadingOfertas: true
        }
        case GET_OFERTAS_SUCCESS: return {
            loadingOfertas: false,
            ofertas: action.payload
        }
        case GET_OFERTAS_FAIL: return {
            loadingOfertas: false,
            errorOfertas: action.payload
        }
        default: return state
    }
    
}