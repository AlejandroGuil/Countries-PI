import React , {useState}  from "react";
import { postActivity, delete_res_activity } from "../../Redux/actions";
import { useDispatch } from 'react-redux'
import { connect } from "react-redux"
import { useEffect } from 'react'

//IMPORTANTE
//LA respuesta del request a la API llega:
// - En el caso de un error: respuesta.response.data.msg
// - En el caso de 200: respuesta.data

function mapStateToProps(state){
  return {
     respuesta : state.res_actividad
  }
}

function validate(input){
  let errors = {}
  
  
  function validateIdPais(){
    
    if(!input.id_pais.length){
      errors.id_pais='Debes ingresar al menos un país'
    }
    if(input.nuevo_pais){
      if(!/^[A-Za-z]{3}$/.test(input.nuevo_pais)) errors.nuevo_pais="El id del país debe ser de tres letras"
    } 
  }
  // Opcion_nueva_actividad false REQUIERE id_pais y id_activiy
  if(!input.opcion_nueva_actividad){
    
    
    if(!input.id_activity){
      errors.id_activity='Id de actividad es requerido'
    } 
    else if (!/^[0-99999]{0,5}$/.test(input.id_activity))
      errors.id_activity="El id de la actividad debe ser un número"
    }
  else{ 
    //Opcion_nueva_actividad true ... requiere name temporada dificultad duracion y pregunta por asignar pais
    if(!input.dificultad){
      errors.dificultad='Dificultad es requerida'
    } else if(input.dificultad<1 || input.dificultad>5){
      errors.dificultad='Dificultad debe ser un valor entre 1 y 5';
    }


    if(!input.name){
      errors.name='El nombre es requerido'
    } else if(input.name.length>255){
      errors.name='Cantidad de caracteres superada!!';
    }
    

    if(!input.duracion){
      errors.duracion="Espesifique la duración"
    } else {
      if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(input.duracion)) errors.duracion="Error en el dato duración"}
      if (input.duracion === "00:00") errors.duracion = "Imposible que dure Nada!"
    }

    if(!input.temporada) errors.temporada="Elija temporada"
    
    if(input.opcion){
    validateIdPais();
  }

return errors

}

function Add_Activity(props){
    const dispatch = useDispatch();
    const [errors, setErrors]=useState({})
    const [input, setInput] = useState({
        name:"",
        duracion:"",
        temporada:"",
        dificultad:0,
        opcion: true,
        nuevo_pais:"",
        id_pais:[],
        opcion_nueva_actividad : false,
        id_activity: undefined
    })

    function cambioEnInput(e){
        setInput({...input,[e.target.name]:e.target.value})
        setErrors(validate({...input,[e.target.name]:e.target.value}))
        console.log(input)
    }

    function cambioEnDificultad(e){
        const value = parseInt(e.target.value)
        setInput({...input, dificultad : value}) 
        setErrors(validate({...input, dificultad : value }))
    }

    function agregaPais(){
        if(input.id_pais.includes(input.nuevo_pais.toUpperCase())) alert (input.nuevo_pais+' ya se encuentra como pais asignado.')
        else{
        const value = input.nuevo_pais.toUpperCase()
        setInput({...input, id_pais: input.id_pais.push(value)})
        setInput({...input, nuevo_pais:""})
        setErrors(validate({...input, id_pais: input.id_pais.concat([value])}))
        console.log(input)
        }
    }

    function handleSubmit(evento){
        evento.preventDefault();
        validate(input)
         
        dispatch(postActivity(input))
        //props.history.push('/countries/home')
       // console.log(JSON.stringify(props.respuesta))

        /* const obj= {"name":"A",
        "duracion":"A",
        "temporada":"Verano",
        "dificultad":1,
        "opcion":true,
        "nuevo_pais":"",
        "id_pais":["FRA"]}
        dispatch(postActivity(obj)) */
    }

    function agregaPais_opcion(){
      if(input.opcion) {
        console.log('borra id pais')
        setInput({...input, id_pais : input.id_pais.length=0 })
      }
        setInput({...input, opcion : !input.opcion })   
        setErrors(validate({...input, opcion : !input.opcion }))
   }

   function quitarPaisAsignado(evento){
    const nuevo_id_pais = input.id_pais.filter(e=>e!=evento.target.id) 
    setInput({...input, id_pais: nuevo_id_pais })
    setErrors(validate({...input, id_pais: nuevo_id_pais }))
   }

   function opcionCrearAsignar(){
    setInput({...input, opcion_nueva_actividad : !input.opcion_nueva_actividad, opcion: true })
    setErrors(validate(({...input, opcion_nueva_actividad : !input.opcion_nueva_actividad, opcion: true })))
    dispatch(delete_res_activity())
   }

   //Para que venga pais asignado desde /detail/:id
   //Si el componente recive un parametro desde el componete desde el cual fue redirigido (a través de un Link), recive el parametro por props.location
   useEffect(()=>{
    if(props.location.state){
      if(props.location.state.id){setInput({...input, id_pais: [props.location.state.id]})}
    }
    //Borro res_actividad para limpiar la pantalla
    dispatch(delete_res_activity);
},[])
console.log(errors)
    return(
        <div className="conteiner">
            
            {/* {validate(input)} */}
            {/* {props.respuesta.response && console.log('Respuesta '+props.respuesta.response.data.msg)} */}
            {props.respuesta.data && console.log('Respuesta '+props.respuesta.data.msg)}
            <p></p>
            <input className="button" type="button" onClick={opcionCrearAsignar}  value={!input.opcion_nueva_actividad? 'Crear nueva actividad' : 'Asiganar actividad'}/>
            <p></p>
            {props.respuesta.response && console.log(props.respuesta.response)}
            {/* useEfect borra respuesta antes de montar componente */}
            {!props.respuesta.data && !props.respuesta.response ?             
              <form  onSubmit={handleSubmit}>
                  
                  {input.opcion_nueva_actividad ?
                  (
                    <div className="form">
                      <h3>Ingrese los datos de la nueva actividad</h3>
                      <div className="row">
                      <label>Nombre: </label><br/>{errors.name && <p className="error">{errors.name}</p>}
                      <input className="input_form" name="name" type="text" onChange={cambioEnInput} value={input.name} /><br/><br/>
                      

                      </div>

                      <label>Duración: </label><br/>{errors.duracion && <p className="error">{errors.duracion}</p>}
                      <input className="input_form" style={{fontSize:14}} name="duracion" type="time" onChange={cambioEnInput} value={input.duracion} /><br/>
                      
                      <br/>
                      <label>Temporada: </label><br/>{errors.temporada && <p className="error">{errors.temporada}<br/></p>}
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Verano"}/>Verano<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Otoño"}/>Otoño<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Invierno"}/>Invierno<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Primavera"}/>Primavera<br/><br/>
                      
                      <label>Dificultad: </label><br/>{errors.dificultad && <p className="error">{errors.dificultad}<br/></p>}
                      <input className="input_form" name="dificultad" type="number" min={1} max={5} onChange={cambioEnDificultad} value={input.dificultad.toString()}/><br/>
                      
                      <br/>
                      <input className="button" name="opcion" type="button" onClick={agregaPais_opcion} value={!input.opcion? 'Asignar pais país/es' : 'No asignar'}/><br/>
                      
                    </div>
                    
                  ) 
                  :
                  (
                  <div className="form">
                    <label>Id de actividad: </label><br/>{errors.id_activity && <p className="error">{errors.id_activity}</p>}
                    <input type="text" name="id_activity" onChange={cambioEnInput}/>
                    <br/>
                    
                    <br/>
                  </div>
                  )
                  }
                  
                  <div className="form">
                      
                      {input.opcion && <label>Ingrese Id. de país/es<br /></label> }
                      {errors.nuevo_pais && (<p className="error">{errors.nuevo_pais}</p>) }
                      {errors.id_pais && (<p className="error">{errors.id_pais}</p>) }
                      {input.opcion && <input type="text "name="nuevo_pais" onChange={cambioEnInput} value={input.nuevo_pais}/>}
                      {input.opcion && <input type="button"name="id_pais" onClick={agregaPais} value="Agregar" disabled={errors.nuevo_pais || !input.nuevo_pais? true : false}/>} 
                      

                      {!!input.id_pais.length && input.opcion && <h4>Paises asignados</h4>}
                      {!!input.id_pais.length && input.opcion && input.id_pais.map(pais=>{ 
                        return(
                          //LISTA DE PAISES ASIGNADOS
                          <li key={pais}>{pais} <button id={pais} onClick={quitarPaisAsignado}>x</button></li> 
                        )
                      })}
                      <br/>
                  
                      <br/><input className="button" type="submit" disabled={
                        input.opcion_nueva_actividad? ( errors.dificultad || errors.id_pais || errors.duracion || errors.name || errors.temporada ?  true : false) : (!input.id_pais.length || !input.id_activity || errors.id_activity ||  errors.id_pais?  true: false ) } />
                  </div>
              </form>
              :
              <div>
                {props.respuesta.data && <h2>{props.respuesta.data.msg}</h2>}
                {props.respuesta.response && props.respuesta.response.data && <h2>{props.respuesta.response.data.msg}</h2> }
              </div>
              }
        
        </div>
    )
}

export default connect(mapStateToProps)(Add_Activity)

/* 
import React, { useState } from 'react';


export function validate(input){
    let errors = {}
    if(!input.username){
      errors.username='Username is required'
    } else if(!/\S+@\S+\.\S+/.test(input.username)){
      errors.username='Username is invalid';
    }

    if(!input.password || input.pasword===""){
      errors.password='Password is required'
    }else if(!/(?=.*[0-9])/.test(input.password)){
      errors.password='Password is invalid'
    }
  return errors

}

export default function  Form() {
  const [input, setInput] = useState({username:"",password:""})
  const [errors, setErrors]=useState({})
  
  const handleInputChange = function (e){
    setInput({...input,[e.target.name]:e.target.value})
    setErrors(validate({...input,[e.target.name]:e.target.value }))
  }
  function handleSubmit(evento){
    evento.preventDefault();
    validate(input)
    if(errors.username || errors.password){alert('Error')}else{alert('todo ok')}
  }
  
  return (
      
        <form onSubmit={handleSubmit}>
          <div>
              <label>Username:</label>
              <input className={errors.username && 'danger'} type="text" name="username" onChange={handleInputChange} value={input.username}/>
              {errors.username && (<p>{errors.username}</p>)}
              <label>Password:</label>  
              <input className={errors.password && 'danger'} type="password" name="password" onChange={handleInputChange} value={input.password}/>
              {errors.password && (<p>{errors.password}</p>)}
              <input type="submit" disabled={errors.username || errors.password ? true : false}/>
          </div>
        </form> 
      
  )
} */
//COPIA DE SEGURIDAD
/*     return(
        <div className="conteiner">
            <Nav/>
            {!props.respuesta.data || props.respuesta.response?             
              <form  onSubmit={handleSubmit}>
                  <div className="form">
                      <h3>Ingrese los datos de la nueva actividad</h3> <br/>
                      
                      <label>Nombre: </label><br/>
                      <input name="name" type="text" onChange={cambioEnInput} value={input.name} /><br/>
                      
                      <label>Duración: </label><br/>
                      <input name="duracion" type="text" onChange={cambioEnInput} value={input.duracion} /><br/>
                      
                      <label>Temporada: </label><br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Verano"}/>Verano<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Otoño"}/>Otoño<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Invierno"}/>Invierno<br/>
                      <input name="temporada" type="radio" onChange={cambioEnInput} value={"Otoño"}/>Primavera<br/>
                      
                      <label>Dificultad: </label><br/>
                      <input name="dificultad" type="number" min={1} max={5}onChange={cambioEnDificultad} value={input.dificultad.toString()}/><br/>
                      {errors.dificultad && (<p>{errors.dificultad}</p>)}
                      
                      <input name="opcion" type="button" onClick={agregaPais_opcion} value={!input.opcion? 'Asignar pais país/es' : 'No asignar'} /><br/>
                      
                      {input.opcion && <h3>Ingrese ID</h3>}
                      {input.opcion && <input type="text "name="nuevo_pais" onChange={cambioEnInput} value={input.nuevo_pais}/>}
                      {input.opcion && <input type="button"name="id_pais" onClick={agregaPais} value="Agregar"/>} 
                      {!!input.id_pais.length && input.opcion && <h2>Paises asignados</h2>}
                      {!!input.id_pais.length && input.opcion && input.id_pais.map(pais=>{ 
                        return(
                          <li key={pais}>{pais}</li>
                        )
                      })}
                      <br/>
                      <br/><input type="submit" disabled={errors.dificultad  ? true : false} />
                  </div>
              </form>
              :
              <div>
              <h2>{props.respuesta.data && props.respuesta.data.msg}</h2>
              <h2>{props.respuesta.response.data && props.respuesta.response.data}</h2>
              </div>
              }
        
        </div>
    )
}

export default connect(mapStateToProps)(Add_Activity) */