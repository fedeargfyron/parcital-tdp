import axios from 'axios'

const GET_SERVICIOVENTA_REQUEST = 'GET_SERVICIOVENTA_REQUEST'
const GET_SERVICIOVENTA_SUCCESS = 'GET_SERVICIOVENTA_SUCCESS'
const GET_SERVICIOVENTA_FAIL = 'GET_SERVICIOVENTA_FAIL'

export const getServicioVenta = (id) => async (dispatch) => {
    try{
        dispatch({
            type: GET_SERVICIOVENTA_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            url: `http://localhost:4000/api/servicios/venta/${id}`
        })
        dispatch({
            type: GET_SERVICIOVENTA_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICIOVENTA_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    servicioVenta: null
}

export const getServicioVentaReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SERVICIOVENTA_REQUEST: return {
            loadingServicioVenta: true
        }
        case GET_SERVICIOVENTA_SUCCESS: return{
            loadingServicioVenta: false,
            servicioVenta: action.payload
        }
        case GET_SERVICIOVENTA_FAIL: return{
            loadingServicioVenta: false,
            errorServicioVenta: action.payload
        }
        default: return state
    }
}
