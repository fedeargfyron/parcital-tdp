import axios from 'axios'

const GET_GRUPO_REQUEST = 'GET_GRUPO'
const GET_GRUPO_SUCCESS = 'GET_GRUPO_SUCCESS'
const GET_GRUPO_FAIL = 'GET_GRUPO_FAIL'

export const getGrupo = (id) => async (dispatch) => {
    try{
        dispatch({
            type: GET_GRUPO_REQUEST
        })
        const { data } = await axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:4000/api/grupos/${id}`
        })
        dispatch({
            type: GET_GRUPO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_GRUPO_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}

const initialState = {
    grupo: null
}

export const getGrupoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GRUPO_REQUEST: return {
            loadingGrupo: true
        }
        case GET_GRUPO_SUCCESS: return{
            loadingGrupo: false,
            grupo: action.payload
        }
        case GET_GRUPO_FAIL: return{
            loadingGrupo: false,
            errorGrupo: action.payload
        }
        default: return state
    }
}