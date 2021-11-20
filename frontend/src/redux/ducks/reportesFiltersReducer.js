const UPDATEFILTROSREPORTES = 'UPDATEFILTROSREPORTES'


export const updateFiltrosReportes = (filtros) => async (dispatch) => {
    dispatch({
        type: UPDATEFILTROSREPORTES,
        payload: filtros
    })
}

const initialState = {
    reporte: "",
    fechaInicio: "",
    fechaFin: "",
    agente: "",
    usuario: ""
}

export const filtrosReportesReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATEFILTROSREPORTES: return action.payload                             
        default: return state
    }
}

