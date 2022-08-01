import { Link } from "react-router-dom"
import React from 'react'

export default function Landing(){
//function iniciar(){props.history.push('/countries/home')}
    
    return (
        <div className="button-container">
            <h1>Bienvenidos a Countries PI</h1>
            <img src="https://www.cndportugues.com/sites/default/files/sites/default/files/pt/imagenes_noticias/worldtraveltourismtravelingaroundtheworld034435.jpg" alt="Img" />
            <Link to='countries/home'>iniciar</Link>
        </div>
    )
}

