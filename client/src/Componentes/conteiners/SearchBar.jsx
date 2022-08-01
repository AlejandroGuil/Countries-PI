import React , {useState} from "react";
import { useDispatch } from "react-redux"
import { searchName ,  getCountryActivity } from "../../Redux/actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        country: "",
        activity: "",
    })

    
    
    
    function cambioEnInput(e){
        setInput({...input, [e.target.name]: e.target.value})
    }
    
    function handleSubmitCountry(evento){
        evento.preventDefault();
        dispatch(searchName(input.country))
        setInput({country:"", activity:"" })
    }

    function handleSubmitActivity(evento){
        evento.preventDefault();
        dispatch(getCountryActivity(input.activity))
        setInput({country:"", activity:"" })
    }

    return(
        <div className="conteiner">

        <div style={{margin: "10px"}}className="container">
            
                <input className="button" name="country" type="text" placeholder="Pais..." onChange={cambioEnInput} value={input.country}></input>
                <input className="button" type="button" onClick={handleSubmitCountry} value="Enviar consulta"/>
                
           
        </div>
        <div style={{margin: "10px"}}className="container">
            
                <input className="button" name="activity" type="text" placeholder="Actividad..." onChange={cambioEnInput}  value={input.activity}></input>
                <input className="button" type="button" onClick={handleSubmitActivity} value="Enviar consulta"/>
                
            
        </div>

        </div>
    )
}

