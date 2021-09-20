import axios from 'axios'

const GET_PERSONAS_REQUEST = 'GET_PERSONAS'
const GET_PERSONAS_SUCCESS = 'GET_PERSONAS_SUCCESS'
const GET_PERSONAS_FAIL = 'GET_PERSONAS_FAIL'

export const getPersonas = (filtros) => async (dispatch) => {
    try{
        dispatch({
            type: GET_PERSONAS_REQUEST
        })
        const { data } = await axios({
            method:"GET",
            withCredentials: true,
            params: {
                filtros: filtros
            },
            url: "http://localhost:4000/api/personas"
        })
        dispatch({
            type: GET_PERSONAS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PERSONAS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    personas: null
}

export const getPersonasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PERSONAS_REQUEST: return {
            loadingPersonas: true
        }
        case GET_PERSONAS_SUCCESS: return{
            loadingPersonas: false,
            personas: action.payload
        }
        case GET_PERSONAS_FAIL: return{
            loadingPersonas: false,
            errorPersonas: action.payload
        }
        default: return state
    }
}