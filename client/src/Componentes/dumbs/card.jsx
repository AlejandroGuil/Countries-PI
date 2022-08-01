import React from "react";

export default function Card(props){

    return(
        <div className="cont_card">
                <div className="card_text">
                    <p>{props.name} </p>
                    <p>{props.continente} </p>
                </div>
                <div>
                <img className="img" src={props.img} alt="img" />
                </div>
            
        </div>
    )
}