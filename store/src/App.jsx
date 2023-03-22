import './App.css'
import {Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/Regist-pptr/PPTR_Register'
import SearchPage from './pages/Search/SearchPage'
import Navbar from './components/Navbar'
import StadisticsPage from './pages/Stadistics/StadisticsPage'

function App() {
  return (
    <div className='app'>
    <Navbar />
    <Routes>
      <Route path='/' element={<RegisterPage />} />
      <Route path='/buscar_permiso' element={<SearchPage />} />
      <Route path='/indicadores' element={<StadisticsPage />} />
    </Routes>
    </div>
  )
}

export default App
