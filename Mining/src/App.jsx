import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navbar } from './containers/Navbar/Navbar'
import { lazy, Suspense } from 'react'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Header } from './containers/Header/Header'


function App() {

  

  return (
    <BrowserRouter>
      <Navbar/>
      <Header/>
      <Routes>
        <Route path='/' element={
          <Suspense fallback={
            <div className='loader'>
              <span className="spinner"></span>
            </div>
          }>
            <Dashboard/>
          </Suspense>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
