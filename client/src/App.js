import './App.css';
import Home from './Componentes/conteiners/home';
import Add_Activity from './Componentes/conteiners/Add_Activity';
import { Route } from 'react-router-dom';
import Detail from './Componentes/conteiners/detail';
import Landing from './Componentes/dumbs/landing';
import Nav from './Componentes/conteiners/nav';
import Footer from './Componentes/dumbs/footer';
import {BrowserRouter} from 'react-router-dom'
//en componenetes de clase Route pasa por defecto el objeto match.props y dentro de el params.id
//en comp funcionales hay q usar el hook UseRouterMatch()
function App() {
  return (
    <div className="App">

  <BrowserRouter>
      <Route exact path="/" component={Landing}/>
      <Route path="/countries/" component={Nav}/>
      <Route path="/countries/home" component={Home}/>
      <Route path="/countries/detail/:id" component={Detail}/>
      <Route path="/countries/add_activity" component={Add_Activity}/>
      <Route path="/countries/" component={Footer}/>
  </BrowserRouter>
      
    </div>
  );
}

export default App;
