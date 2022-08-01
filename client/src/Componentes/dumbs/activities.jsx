import React from "react";
import Actividad from "./activity";
import { connect } from "react-redux";

function mapStatetoProps(store){
    return { array_activities: store.actividades}
}

function Actividades({array_activities}){
    
  
return(
        <div className="conteiner">
            <h2>Actividades</h2>
            <div className="activities">
                {!!array_activities.length ? (
                    
                array_activities.map(act=>{
                        return  <Actividad
                        key={act.id}
                        name={act.name}
                        dificultad={act.dificultad}
                        duracion={act.duracion}
                        temporada={act.temporada}
                        />                           
                    })
                    ):(
                    <h2>Sin actividades</h2>
                )
                }
            </div>
            

    

        </div>
    )
}

export default connect(mapStatetoProps)(Actividades)

