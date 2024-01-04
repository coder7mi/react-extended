import './App.css'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import MRouter from './router'
import Tabbar from './components/Tabbar'

function App() {
  return (
    <BrowserRouter>
      <MRouter></MRouter>
      <Tabbar></Tabbar>
    </BrowserRouter>
  )
}

export default App
