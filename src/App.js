import logo from './logo.svg';
import './App.css';
import HeaderHome from './components/HeaderHome/HeaderHome';
import { Outlet } from 'react-router-dom';
import Slide from './components/Slide/Slide';
import FooterHome from './components/FooterHome/FooterHome';


function App() {
  return (
    <div className='App'>
      <HeaderHome/>
      <Outlet/>
      <FooterHome/>
    </div>
  )
}

export default App;
