import React from "react";
import Nav from "./nav";
import Ativities from "../dumbs/activities";

class Detalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detalle: {},
      actividades:{},
    };
    // COMP FUNCIONAL SE VERIA ASI: const [state, setState] = useState({detalle: {}})
  }

  componentDidMount() {
    // hacer algo antes del renderizado
    const { id } = this.props.match.params;
    fetch("http://localhost:3001/countries/" + id)
      .then((respuesta) => respuesta.json())
      .then((respuestaJson) => this.setState({ detalle: respuestaJson, actividades:{a: respuestaJson.Ativities}  }));
  }

  render() {
    // eslint-disable-next-line no-restricted-globals
    
    const {detalle, actividades}=this.state
    console.log(detalle.Activities)
    return (
      <div className="container">
        <Nav/>
        <h3> Nombre: {detalle.name} </h3>
        <img src={detalle.img} alt="imagen de detalle" />
        <h3> Id: {detalle.id} </h3>
        <h3> Species: {detalle.poblaion} </h3>

        {/* !!detalle.Activities.length ? ( 
         (<Ativities activities={detalle.Ativities}/>) 
            ) : (
          <h2>El Array está vacio</h2>      
            ) */
         }
        
      </div>
    );
  }
}

export default Detalle;
