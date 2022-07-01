import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
