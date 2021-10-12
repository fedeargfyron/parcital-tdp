const UPDATEFILTROSREPORTES = 'UPDATEFILTROSREPORTES'


export const updateFiltrosReportes = (filtros) => async (dispatch) => {
    dispatch({
        type: UPDATEFILTROSREPORTES,
        payload: filtros
    })
}

const initialState = {
    
}

export const filtrosReportesReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATEFILTROSREPORTES: return action.payload                             
        default: return state
    }
}

