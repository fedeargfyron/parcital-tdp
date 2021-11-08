import axios from 'axios'

const GET_REPORTE_REQUEST = 'GET_REPORTE_REQUEST'
const GET_REPORTE_SUCCESS = 'GET_REPORTE_SUCCESS'
const GET_REPORTE_FAIL = 'GET_REPORTE_FAIL'

export const getReporte = (filtros, reporte) => async (dispatch) => {
    try{
        dispatch({
            type: GET_REPORTE_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: `http://localhost:4000/api/reportes/${reporte}`
        })
        dispatch({
            type: GET_REPORTE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_REPORTE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    reporte: null
}

export const getReporteReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REPORTE_REQUEST: return {
            loadingReporte: true
        }
        case GET_REPORTE_SUCCESS: return {
            loadingReporte: false,
            reporte: action.payload
        }
        case GET_REPORTE_FAIL: return {
            loadingReporte: false,
            reporte: action.payload
        }
        default: return state
    }
    
}