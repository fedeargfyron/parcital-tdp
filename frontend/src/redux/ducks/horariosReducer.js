import axios from 'axios'

const GET_HORARIOS_REQUEST = 'GET_HORARIOS'
const GET_HORARIOS_SUCCESS = 'GET_HORARIOS_SUCCESS'
const GET_HORARIOS_FAIL = 'GET_HORARIOS_FAIL'

export const getHorarios = () => async (dispatch) => {
    try{
        dispatch({
            type: GET_HORARIOS_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4000/api/horarios'
        })
        dispatch({
            type: GET_HORARIOS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_HORARIOS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    horarios: null
}

export const getHorariosReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_HORARIOS_REQUEST: return {
            loadingHorarios: true
        }
        case GET_HORARIOS_SUCCESS: return{
            loadingHorarios: false,
            horarios: action.payload                                            
        }   
        case GET_HORARIOS_FAIL: return{
            loadingHorarios: false,
            errorHorarios: action.payload
        }
        default: return state
    }
}