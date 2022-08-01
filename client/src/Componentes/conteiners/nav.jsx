import React from "react";
import { Link } from "react-router-dom";

export default function Nav(){  
  return(
        <div className="conteiner_column">
        <div className="nav">
           <Link to="/countries/home" >
             <span> Home  </span>
           </Link>
           <Link to="/countries/add_activity">
             <span>  Crear/Asignar Actividad Turística  </span>
           </Link>
            
        </div>

        </div>
    )
}