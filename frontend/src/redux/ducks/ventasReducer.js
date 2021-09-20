import axios from 'axios'

const GET_VENTAS_REQUEST = 'GET_VENTAS_REQUEST'
const GET_VENTAS_SUCCESS = 'GET_VENTAS_SUCCESS'
const GET_VENTAS_FAIL = 'GET_VENTAS_FAIL'

export const getVentas = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_VENTAS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: 'http://localhost:4000/api/ventas'
        })
        dispatch({
            type: GET_VENTAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_VENTAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    ventas: null
}

export const getVentasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VENTAS_REQUEST: return {
            loadingVentas: true
        }
        case GET_VENTAS_SUCCESS: return {
            loadingVentas: false,
            ventas: action.payload
        }
        case GET_VENTAS_FAIL: return {
            loadingVentas: false,
            errorVentas: action.payload
        }
        default: return state
    }
    
}