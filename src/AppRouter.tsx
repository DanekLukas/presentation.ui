import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Pages/Header'
import Homepage from './Pages/Homepage'
import React from 'react'

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header />
                <Homepage />
              </>
            }
          />
          <Route
            path='*'
            element={
              <>
                <Header />
                <Homepage
                  name={window.document.location.pathname.substring(1).split('/')[0].split('#')[0]}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
