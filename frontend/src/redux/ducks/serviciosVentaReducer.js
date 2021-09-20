import axios from 'axios'

const GET_SERVICIOSVENTA_REQUEST = 'GET_SERVICIOSVENTA_REQUEST'
const GET_SERVICIOSVENTA_SUCCESS = 'GET_SERVICIOSVENTA_SUCCESS'
const GET_SERVICIOSVENTA_FAIL = 'GET_SERVICIOSVENTA_FAIL'

export const getServiciosVenta = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_SERVICIOSVENTA_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: `http://localhost:4000/api/servicios/venta`
        })
        dispatch({
            type: GET_SERVICIOSVENTA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICIOSVENTA_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    serviciosVenta: null
}

export const getServiciosVentaReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SERVICIOSVENTA_REQUEST: return {
            loadingServiciosVenta: true
        }
        case GET_SERVICIOSVENTA_SUCCESS: return{
            loadingServiciosVenta: false,
            serviciosVenta: action.payload
        }
        case GET_SERVICIOSVENTA_FAIL: return{
            loadingServiciosVenta: false,
            errorServiciosVenta: action.payload
        }
        default: return state
    }
}
