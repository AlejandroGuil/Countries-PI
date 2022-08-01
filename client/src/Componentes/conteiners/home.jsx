import React , { useEffect } from 'react'
import Cards from "../dumbs/cards";
import { connect } from "react-redux"
import { getCountries , delete_res_activity } from "../../Redux/actions"
import SearchBar from './SearchBar';


function mapStateToProps(state){
    return {
        countries: state.countries
    }
}

function Home(props){
    
    useEffect(()=>{
        props.getCountries();
        props.delete_res_activity();
    },[])

    
    return(
        
        <div className="conteiner">
            <div className="conteiner">
                <SearchBar countries={props.countries}/>
                <Cards countries={props.countries}/>
            </div>
            {!props.countries.response  ? 
                ( 
                    <div className="conteiner">
                       { !Array.isArray(props.countries) ? 
                           (<div className="coteiner">
                                <h2>Cargando...</h2>
                            </div>) : (console.log('Home'))
                        }
                    </div>
                ) : (
                    <div className="conteiner">
                        {props.countries.response.data && <h2>{props.countries.response.data}</h2> }
                        {!props.countries.response.data && <h2>{props.countries.response}</h2>}
                    </div>
                )
            }
         </div>
    ) 
                    
           

        
        
    
}

export default connect(mapStateToProps, { getCountries , delete_res_activity })(Home)