import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { searchId } from "../../Redux/actions";
import Actividades from "../dumbs/activities";
import { Link } from "react-router-dom";

function mapStateToProps(state){
    return { 
        country: state.country, actividades: state.actividades }
}


function Detail(props){
    const match = useRouteMatch();
    const {id}=match.params
    
    useEffect(()=>{
        props.searchId(id)  
    },[])

    return(
        <div className="conteiner">
            {!props.country.msj ? 
                <div>
                    
                    <h1>{props.country.name}   {props.country.id} </h1>
                    <div className="div_img">
                        <img className="img_detail" src={props.country.img} alt="img" />
                    </div>
                    
                    
                    <h2>{props.country.region}</h2>
                    <h2>{props.country.subregion}</h2>
                    <h2>Capital: {props.country.capital}</h2>
                    <h2>Area: {props.country.area}</h2>
                    <h2>Población: {props.country.population}</h2>
                    <Actividades/> 
                    
                    <Link to={{pathname:"/countries/add_activity", state:{id}}}>
                        <h3>Agregar/Asignar Actividad</h3>
                    </Link>
                </div> 
            : 
                <h2>{props.country.msj}</h2>}
            
        </div>
    )
}

export default connect(mapStateToProps, { searchId })(Detail)