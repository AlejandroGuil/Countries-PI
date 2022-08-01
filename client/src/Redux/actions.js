import axios from 'axios'

export const GET_COUNTRIES = "OBTENER LOS PAISES"
export const ACTIVITY = "OBTENER ACTIVIDADES"
export const POST_ACTIVITY = "ENVIA ACTIVIDAD"
export const SEARCH_ID = "SEARCH_ID"
export const SEARCH_NAME= "SEARCH_NAME"
export const DELETE_RES_ACTIVITY = "BORRA RES_ACTIVITY"
export const ASC_DES = "ASC_DES"
export const ORDENAR_AZ = "ORDENAR ALFABETICAMENTE"
export const ORDENAR_POB = "ORDENAR POR POBLACION"
export const FILTRAR_CONT = "FILTRAR X CONTINENTE"
export const FILTRAR_TEMP = "FILTRAR X TEMPORADA" 
const URL_COUNTRIES = "http://localhost:3001/countries/"
const URL_ACTIVITY = "http://localhost:3001/activities/"

export function getCountries(){
    return function (dispatch) {
        return fetch(URL_COUNTRIES)
          .then((respuesta) => respuesta.json())
          .then((respuestaJson) =>
            dispatch({ type: GET_COUNTRIES, payload: respuestaJson })
          )
          .catch(e=>console.log(e))
          ;
      };
}

export function getCountryActivity(name){
  console.log(name)


  return function (dispatch) {
    return axios.get(URL_ACTIVITY+'/one' , { params: { name } })
      
      .then(res => dispatch({ type: ACTIVITY, payload: res.data.Countries}))
      .catch(res => dispatch({type : ACTIVITY, payload : res}))
  };
  
  /*   return function (dispatch) {
      return axios.get(URL_ACTIVITY+'one', { params:  name  })
      .then(res => dispatch({type : ACTIVITY, payload : res.data}))
      .catch(res => dispatch({type : ACTIVITY, payload : res}))
    } */
}


export function searchName(name){  
  
  return function (dispatch) {
      return axios.get(URL_COUNTRIES, { params: { name } })
      .then(res => dispatch({type : SEARCH_NAME, payload : res.data}))
      .catch(res => dispatch({type : SEARCH_NAME, payload : res}))
  }
} 

export function postActivity(activity){
  return function (dispatch) {
      return axios.post(URL_ACTIVITY, activity)
      .then(res => dispatch({type : POST_ACTIVITY, payload : res}))
      
      .catch(res => dispatch({type : POST_ACTIVITY, payload : res}))
  }
} 

export function searchId(id) {
    return function (dispatch) {
      return fetch(URL_COUNTRIES+id)
        .then((respuesta) => respuesta.json())
        .then((respuestaJson) =>
          dispatch({ type: SEARCH_ID, payload: respuestaJson})
        )
        .catch((e) => console.log(e))
    };
}

export function delete_res_activity(){
  return {type: DELETE_RES_ACTIVITY, payload:{}}
}

export  function asc_des(countries){
    let array = countries.reverse()
    return {type:ASC_DES, payload:array }
}
//PARA ORDENAR ALFABETICAMENTE USA SORT()
export function ordenarAz(countries){

  function SortArray(x, y){
    if (x.name.toLowerCase() < y.name.toLowerCase()) {return -1;}
    if (x.name.toLowerCase() > y.name.toLowerCase()) {return 1;}
    return 0;
  }

  const s = countries.sort(SortArray);
  return {type: ORDENAR_AZ, payload: s}

}

export function ordenarPob(countries){

  function SortArray(x, y){
    if (x.population > y.population) {return -1;}
    if (x.population < y.population) {return 1;}
    return 0;
  }

  const s = countries.sort(SortArray);
  return {type: ORDENAR_AZ, payload: s}

}

export function filterCont(countries, continente){
  let res = countries.filter(c=> c.region === continente)
  if(!res.length) res={ response : 'No hay paises para esta busqueda'}
  console.log(res)
  return { type: FILTRAR_CONT, payload: res}
}

export function filterTemp(countriesAll, Temp_Check, Cont_Check, Dif_Check, Du_Check){
  let res_temp = countriesAll;
  let result;
  
  if(Temp_Check.aa || Temp_Check.ab || Temp_Check.ac || Temp_Check.ad) {
        let array_busqueda = ["x","x","x","x"]
          if(Temp_Check.aa) array_busqueda.splice(0,1,"Otoño")
          if(Temp_Check.ab) array_busqueda.splice(1,1,"Invierno")
          if(Temp_Check.ac) array_busqueda.splice(2,1,"Primavera")
          if(Temp_Check.ad) array_busqueda.splice(3,1,"Verano")
          
          res_temp = countriesAll.filter(c=>{
            result = c.Activities.map(b=>  b.temporada === array_busqueda[0] || b.temporada === array_busqueda[1] || b.temporada === array_busqueda[2] || b.temporada === array_busqueda[3] ? true : false)
            return result.includes(true)            
            })
  }
  
  let res_cont = res_temp;

  if(Cont_Check.a || Cont_Check.b || Cont_Check.c || Cont_Check.d || Cont_Check.e || Cont_Check.f ){
    let array_busqueda = ["x","x","x","x","x","x"]
    if(Cont_Check.a) array_busqueda.splice(0,1,"Europe")
    if(Cont_Check.b) array_busqueda.splice(1,1,"Americas")
    if(Cont_Check.c) array_busqueda.splice(2,1,"Asia")
    if(Cont_Check.d) array_busqueda.splice(3,1,"Oceania")
    if(Cont_Check.e) array_busqueda.splice(4,1,"Africa")
    if(Cont_Check.f) array_busqueda.splice(5,1,"Antarctic")
  
    res_cont = res_temp.filter(b=> b.region === array_busqueda[0] || b.region === array_busqueda[1] || b.region === array_busqueda[2] || b.region === array_busqueda[3] || b.region === array_busqueda[4] || b.region === array_busqueda[5])

  }

  let res_dif = res_cont
  if(Dif_Check.da || Dif_Check.db || Dif_Check.dc || Dif_Check.dd || Dif_Check.de){
    let array_busqueda = ["x","x","x","x","x"]
    if(Dif_Check.da) array_busqueda.splice(0,1,1)
    if(Dif_Check.db) array_busqueda.splice(1,1,2)
    if(Dif_Check.dc) array_busqueda.splice(2,1,3)
    if(Dif_Check.dd) array_busqueda.splice(3,1,4)
    if(Dif_Check.de) array_busqueda.splice(4,1,5)
    res_dif = res_cont.filter(c=>{
      result = c.Activities.map(b=>  b.dificultad === array_busqueda[0] || b.dificultad === array_busqueda[1] || b.dificultad === array_busqueda[2] || b.dificultad === array_busqueda[3] || b.dificultad === array_busqueda[4] ? true : false)
      return result.includes(true)            
      })  
  }

  let res_du = res_dif
  if(Du_Check.dua || Du_Check.dub || Du_Check.duc || Du_Check.dud || Du_Check.due){
    
    res_du = res_dif.filter(c=>{
      result = c.Activities.map(b=>  (Du_Check.dua && b.duracion < "00:30") || (Du_Check.dub && b.duracion >= "00:30" && b.duracion < "01:00") || (Du_Check.duc && b.duracion >= "01:00" && b.duracion < "02:00") || (Du_Check.dud && b.duracion >= "02:00" && b.duracion < "05:00") || (Du_Check.due && b.duracion >= "05:00" )? true : false)
      return result.includes(true)            
       })  
  }

  if(!res_du.length) res_du={ response : 'No hay paises para esta busqueda'}
    

  

  return { type:FILTRAR_TEMP, payload: res_du}
  
  /* let res = countries.filter((c)=>{
        const res = c.Activities.map(b=>  b.temporada === temp? true : false)
        return res.includes(true)            
      })
    if(!res.length) res={ response : 'No hay paises para esta busqueda'}
    return { type:FILTRAR_TEMP, payload: res} */
}

//GET AXIOS QUERY
/* const axios = require('axios');

// Equivalent to `axios.get('https://httpbin.org/get?answer=42')`
const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });

res.data.args; // { answer: 42 } */

//POST FETCH
/* export function postActivity(activity){
    console.log(JSON.stringify(activity))
    return function (dispatch) {
        return fetch(URL_ACTIVITY, {method: 'POST', body:JSON.stringify(activity)})
        .then(res => res.json())
        .then(response => dispatch({type : POST_ACTIVITY, payload : response}))
    }
 } */
 
//POST FECTH CONFIGURATION
 /*  fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response)); */

//CONFIGURAR FETCH
/* 
            const handleSubmit = async event => {
        try {
            await fetch(`https://api.example.net/api/route?slug=example`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    
                    'x-api-key':  
                    //API KEY
                },
                body: JSON.stringify({
                    name,
                    email
                })
            })
                .then(response => console.log(response))
                .catch(err => console.log(err));
        } catch (error) {
            console.log(error);
        }
  };
 */

