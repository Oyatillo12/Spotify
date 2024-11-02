import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {  Liked, Search, Single } from '../pages'
import {PATH} from '../hooks/usePath'

const Home = lazy(() => new Promise(resolve => {
  return setTimeout(() => resolve(import('../pages/Dashboard/Home')), 1000)
}))

function CustomRoutes() {
  return (
    <Routes>
        <Route path={PATH.home} element={<Suspense fallback={<div className='h-[100vh] flex items-center justify-center login-wrapper'><span className='loader !scale-150'></span></div>}><Home/></Suspense>} />
        <Route path={PATH.search} element={<Search />} />
        <Route path={PATH.liked} element={<Liked />} />
        <Route path={PATH.single} element={<Single />} />
    </Routes>
  )
}

export default CustomRoutes
