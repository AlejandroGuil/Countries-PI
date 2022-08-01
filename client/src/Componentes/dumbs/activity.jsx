import React from "react";

export default function Actividad(act){
    return(
        <div key={act.id} className="conteiner">
            <div className="border">
                <h3>Nombre: {act.name}</h3>
                <h3>Duración: {act.duracion}</h3>
                <h3>Dificultad: {act.dificultad}</h3>
                <h3>Temporada: {act.temporada}</h3>
            </div>
        </div>
    )
}