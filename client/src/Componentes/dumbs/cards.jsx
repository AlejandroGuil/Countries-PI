import React, {useEffect, useState} from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux"
import { asc_des, filterCont, filterTemp, getCountries, ordenarAz, ordenarPob } from "../../Redux/actions";

function mapStateToProps(state){
    return {
       countries : state.countries,
       countriesAll: state.countriesAll
    }
  }

function Cards(props){
    const dispatch = useDispatch();
    const [pag, setPag] = useState({num: 1, inicio: -1})
    const [cambios, setcambios] = useState(true) //Tube q implementar este state xq al aplicar la inversion del array (ascDes) cambiaba props. pero no actualizaba componente
    const [cant_paises, setCantPaises] = useState(props.countries.length) //PAGINADO para saber si hubo cambios en el array p.ej. en caso de busqueda (ya que no se sale del componenete entonces no hay useefect)
    
    const [temp_checks, setTemp_Checks] = useState({aa:false,ab:false,ac:false,ad:false})
    const [region_checks, setRegion_Checks] = useState({a:false,b:false,c:false,d:false,e:false,f:false})
    const [dif_checks, setDif_Checks] = useState({da:false,db:false,dc:false,dd:false,de:false})
    const [du_checks, setDu_Checks] = useState({dua:false,dub:false,duc:false,dud:false,due:false})
    const cards = [] //Se llena en el for y se imprime en el div del return del componenete
    
    
    function pagSiguiente(){        
        setPag({...pag, num:pag.num+1, inicio: pag.inicio+10})
    }
    function pagAnterior(){
        setPag({...pag, num:pag.num-1, inicio: pag.inicio-10})
    }
    function verTodos(){   
        
        setTemp_Checks({aa:false,bb:false,cc:false,dd:false})
        setRegion_Checks({a:false,b:false,c:false,d:false,e:false,f:false})
        setDif_Checks({da:false,db:false,dc:false,dd:false,de:false})
        dispatch(getCountries())
    }
    function ascDes(){
        if(!!props.countries.length) dispatch(asc_des(props.countries)) 
        setcambios(!cambios)
    }
    function ordenar_Az(){
        if(!!props.countries.length) dispatch(ordenarAz(props.countries)) 
        setcambios(!cambios)
    }
    function ordenar_Pob(){
        if(!!props.countries.length) dispatch(ordenarPob(props.countries)) 
        setcambios(!cambios)
    }
    function filter_cont(e){
        const region = {...region_checks, [e.target.id]:!region_checks[e.target.id]}
        setRegion_Checks(region)
        dispatch(filterTemp(props.countriesAll, temp_checks, region, dif_checks, du_checks)) 
    }
    function filter_temp(e){
       const temp = {...temp_checks, [e.target.id]:!temp_checks[e.target.id]}
       setTemp_Checks(temp)
       dispatch(filterTemp(props.countriesAll, temp, region_checks, dif_checks, du_checks)) 

        /*Para chequear uno solo CheckBox
        if(e.target.id==='a')
        setChecks({a:!checks.a,b:false,c:false,d:false})
        if(e.target.id==='b')
        setChecks({a:false,b:!checks.b,c:false,d:false})
        if(e.target.id==='c')
        setChecks({a:false,b:false,c:!checks.c,d:false})
        if(e.target.id==='d')
        setChecks({a:false,b:false,c:false,d:!checks.d}) */
    }
    function filter_dificultad(e){
       const dif = {...dif_checks, [e.target.id]:!dif_checks[e.target.id]}
       setDif_Checks(dif)
       dispatch(filterTemp(props.countriesAll, temp_checks, region_checks, dif, du_checks))
    }
    function filter_duracion(e){
        const du = {...du_checks, [e.target.id]:!du_checks[e.target.id]}
        setDu_Checks(du)
        dispatch(filterTemp(props.countriesAll, temp_checks, region_checks, dif_checks, du))
     }

    //SI HUBO BUSQUEDA SETEO LAS PAGINAS AL INICIO
    if(cant_paises != props.countries.length)
    {   setPag({inicio:-1,num:1})
        setCantPaises(props.countries.length)}
    
    //PARA MOSTRAS 9 ELEMENTOS EN LA 1er PAG
    let inicio = pag.inicio
    let hasta = pag.inicio+10
    if(pag.num===1){
        inicio=0;
        hasta=9
    }
    //Debido a q la primer pagina muestra 9 elementos el...
    //... valor de inicio está en -1, para que al sumar diez en cada página muestre desde 9 hasta 19, 19 a 29 (hasta= pag.inicio + 10)
    
    if (!!props.countries.length){
        for(let i = inicio; i<hasta ; i++){
           if(!props.countries[i])break
            const country=props.countries[i];
            cards.push(
                <div key={country.id} className="conteiner">
                    <Link style={{textDecoration: 'none' }} to={`/countries/detail/${country.id}`}>
                    <Card
                        name={country.name}
                        continente={country.region}
                        img={country.img}
                        id={country.id}
                    />
                    </Link>
                </div>
            )
        }
    }  
    
    return(
        <div className="conteiner">  
            <div className="conteiner_column">
                {/* BOTONERA */}
                    <div className="conteiner_row">
                        <input className="button" type="button" value="Ver todos" onClick={verTodos}/>
                        <input className="button" type="button" value="Invertir" onClick={ascDes}/>   
                        <input className="button" type="button" value="Ordenar A-Z" onClick={ordenar_Az}/> 
                        <input className="button" type="button" value="Ordenar x Población" onClick={ordenar_Pob}/> 
                    </div>
                    <div className="conteiner_row">
                        {/*CONTINENTE*/}
                        <div className="border">
                            <h3 style={{textAlign: 'start'}} >Continente</h3>
                            <div className="conteiner_column">
                                
                                <div className="conteiner_row">
                                    <input id="a" type="checkbox" value="Europe" onChange={filter_cont} checked={region_checks.a}/>
                                    <label>Europa</label>
                                </div>
                                <div className="conteiner_row">
                                    <input id="b" type="checkbox" value="Americas" onChange={filter_cont} checked={region_checks.b}/>
                                    <label>América</label>
                                </div> 
                                <div className="conteiner_row">
                                    <input id="c" type="checkbox" value="Asia" onChange={filter_cont} checked={region_checks.c}/>
                                    <label>Asia</label>
                                </div>
                                <div className="conteiner_row">
                                    <input id="d" type="checkbox" value="Oceania" onChange={filter_cont} checked={region_checks.d}/>
                                    <label>Occeania</label>
                                </div>
                                <div className="conteiner_row">
                                    <input id="e" type="checkbox" value="Africa" onChange={filter_cont} checked={region_checks.e}/>
                                    <label>Africa</label>
                                </div>
                                <div className="conteiner_row">
                                    <input id="f" type="checkbox" value="Antarctic" onChange={filter_cont} checked={region_checks.f}/>
                                    <label>Antártida</label>
                                </div>
                            </div>
                        </div>
                        {/*ACTIVIDADES*/}
                        <div className="border">
                            <h3 style={{textAlign: 'start'}}>Actividades</h3>
                                <div className="conteiner_row">
                                    {/* TEMPORADA */}
                                    <div className="conteiner_column">
                                        <p className="p">Temporada</p>
                                        <div className="conteiner_row">
                                            <input id="aa" type="checkbox" value="Otoño" onChange={filter_temp} checked={temp_checks.aa}/>
                                            <label >Otoño</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="ab" type="checkbox" value="Invierno" onChange={filter_temp} checked={temp_checks.ab} />
                                            <label>Invierno</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="ac" type="checkbox" value="Primavera" onChange={filter_temp} checked={temp_checks.ac} />
                                            <label >Primavera</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="ad" type="checkbox" value="Verano" onChange={filter_temp} checked={temp_checks.ad} />
                                            <label >Verano</label>
                                        </div>
                                    </div>
                                    {/* DIFICULTAD */}
                                    <div className="conteiner_column">
                                        <p className="p">Dificultad</p>
                                        <div className="conteiner_row">
                                            <input id="da" type="checkbox" value="1" onChange={filter_dificultad} checked={dif_checks.da}/>
                                            <label>1</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="db" type="checkbox" value="2" onChange={filter_dificultad} checked={dif_checks.db}/>
                                            <label>2</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="dc" type="checkbox" value="3" onChange={filter_dificultad} checked={dif_checks.dc}/>
                                            <label>3</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="dd" type="checkbox" value="4" onChange={filter_dificultad} checked={dif_checks.dd}/>
                                            <label>4</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="de" type="checkbox" value="5" onChange={filter_dificultad} checked={dif_checks.de}/>
                                            <label>5</label>
                                        </div>
                                        
                                    </div>
                                    {/* DURACION */}
                                    <div className="conteiner_column">
                                        <div className="conteiner_row">
                                        <p className="p">Duración</p>

                                        </div>
                                        <div className="conteiner_row">
                                            <input id="dua" type="checkbox" value="1" onChange={filter_duracion} checked={du_checks.dua}/>
                                            <label>Menos de 30min</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="dub" type="checkbox" value="1" onChange={filter_duracion} checked={du_checks.dub}/>
                                            <label>Entre 30min y 1hr</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="duc" type="checkbox" value="2" onChange={filter_duracion} checked={du_checks.duc}/>
                                            <label>Entre 1 y 2 hrs</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="dud" type="checkbox" value="3" onChange={filter_duracion} checked={du_checks.dud}/>
                                            <label>Entre 2 y 5 hrs</label>
                                        </div>
                                        <div className="conteiner_row">
                                            <input id="due" type="checkbox" value="4" onChange={filter_duracion} checked={du_checks.due}/>
                                            <label>Mas de 5 hrs </label>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>    
            {/* PAGINADO Y CARDS*/}   
                {!!props.countries.length ? (
                    <div className="conteiner">
                        <h2>Página {pag.num}</h2>
                            <div className="conteiner_pag">
                                <input className="button" type="button" value="Anterior" onClick={pagAnterior} disabled={pag.num===1? true : false}/>
                                <div className="conteiner">
                                    {cards}
                                </div>
                            {/* le agregué al siguiente boton una pagina más q el largo del (array/10) (cantidad de páginas, 10 x pag), ya q la primer pag deja un elemento afuera */}
                            <input className="button" type="button" value="Siguiente" onClick={pagSiguiente} disabled={Math.trunc(props.countries.length/10)+1<=pag.num? true : false}/>
                        </div>
                    </div>
                ):(console.log())}   
            
        </div>
    )
}

export default connect(mapStateToProps)(Cards)


/* class App extends Component {
  render() {
    const data = [{name: "John Doe", "age": 44}, {name:"Jane Doe", "age": 45}]
    let persons = [];
    for (let i = 0; i<data.length; i++){
      persons.push(<p>{data[i].name + ", " + data[i].age + " years old"}</p>)
    }
    return <div>
    {persons}
    </div>
  }
}
 */

//COPIA DE SEGURIDAD
/* import React, {useState} from "react";
import Card from "./card";
import { Link } from "react-router-dom";

export default function Cards({countries}){
    const [pag, stPag] = useState(1)
    return(
        <div className="cont_cards">
        <h3>Página {pag}</h3>
         {!!countries.length ? ( 
            countries.map(country=>{
                return(
                    
                        <div key={country.id} className="cont_card">
                            <Link to={`/countries/detail/${country.id}`}>
                            <Card
                                name={country.name}
                                continente={country.region}
                                img={country.img}
                                id={country.id}
                            />
                            </Link>
                        </div> 
                    
                )   
            })
            ) : (
          <h2>Cargando...</h2>      
            )
         }

        </div>
    )
} */