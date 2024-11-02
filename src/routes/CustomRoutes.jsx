import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Liked, Search, Single } from '../pages'
import {PATH} from '../hooks/usePath'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={PATH.home} element={<Home />} />
        <Route path={PATH.search} element={<Search />} />
        <Route path={PATH.liked} element={<Liked />} />
        <Route path={PATH.single} element={<Single />} />
    </Routes>
  )
}

export default CustomRoutes
