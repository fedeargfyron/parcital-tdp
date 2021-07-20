import axios from 'axios'

const GET_VISITAS_REQUEST = 'GET_VISITAS_REQUEST'
const GET_VISITAS_SUCCESS = 'GET_VISITAS_SUCCESS'
const GET_VISITAS_FAIL = 'GET_VISITAS_FAIL'

export const getVisitas = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_VISITAS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/visitas'
        })
        dispatch({
            type: GET_VISITAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_VISITAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    visitas: null
}

export const getVisitasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VISITAS_REQUEST: return {
            loadingVisitas: true
        }
        case GET_VISITAS_SUCCESS: return {
            loadingVisitas: false,
            visitas: action.payload
        }
        case GET_VISITAS_FAIL: return {
            loadingVisitas: false,
            errorVisitas: action.payload
        }
        default: return state
    }
    
}