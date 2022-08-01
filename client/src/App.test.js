import { render, screen } from '@testing-library/react';
import App from './App';
import Home from '../src/Componentes/conteiners/home'


xtest('Renderize un boton con el texto "iniciar"', () => {
  render(<App />);
  const linkElement = screen.getByText("iniciar");
  expect(linkElement).toBeInTheDocument();
}); 


xdescribe("<Home/>", () => { 
  let home;

})
test('<Home/> contenga un botón con el texto "Ver todos"', () => {
  render(<Home />);
  const botonElement = screen.getByText("Ver todos");
  expect(botonElement).toBeInTheDocument();
}); 




