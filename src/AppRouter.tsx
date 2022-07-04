import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './pages/Header'
import Homepage from './pages/Homepage'
import React from 'react'

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='*'
            element={
              <>
                <Header />
                <Homepage />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
