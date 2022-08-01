import {
    GET_COUNTRIES,
    POST_ACTIVITY,
    SEARCH_ID,
    SEARCH_NAME,
    DELETE_RES_ACTIVITY,
    ASC_DES, ORDENAR_AZ,
    ORDENAR_POB,
    FILTRAR_CONT,
    FILTRAR_TEMP,
    ACTIVITY
} from './actions'

let initialState = {
    countries: [],
    countriesAll: [],
    countryActivity: [],
    country: {},
    res_actividad: {},
    actividades: []
}

export default function reducer(state = initialState,{type, payload}){
    switch(type){
        
        case GET_COUNTRIES:
            console.log('REDUCER GET COUNTRY')
            return {...state, countries: payload, countriesAll : payload}

        
        
        case POST_ACTIVITY:
            return {...state, res_actividad: payload}

        case SEARCH_NAME:
            return {...state, countries: payload}

        case SEARCH_ID:  
            return {...state, country: payload, actividades: payload.Activities, country_error:{}}

        case DELETE_RES_ACTIVITY:
            
            return {...state, res_actividad: payload}

        case ASC_DES:
            return {...state, countries: payload}

        case ORDENAR_AZ:
            return {...state, countries: payload}

        case ORDENAR_POB:
            return {...state, countries: payload}

        case FILTRAR_CONT:
            return {...state, countries: payload}

        case FILTRAR_TEMP:
            return {...state, countries: payload}

        case ACTIVITY:
            console.log(payload)
            return {...state, countries: payload}

        default:
             return {...state}
    }
}