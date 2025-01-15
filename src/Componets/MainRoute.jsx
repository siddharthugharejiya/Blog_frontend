import React from 'react'
import {Route, Routes} from "react-router-dom"
import SignUp from './SignUp'
import Login from './Login'
import Blog from './Blog'
import Add from './Add'
import Own from './Own'
import Single from './Single'
import Edite from './Edite'
// import Del from './Del'
function MainRoute() {
  return (
    <Routes>
     <Route path='/register' element={<SignUp/>}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/' element={<Blog/>}></Route>
     <Route path='/add' element={<Add/>}></Route>
     <Route path='/own' element={<Own/>}></Route>
     <Route path='/single/:id' element={<Single/>}></Route>
     <Route path='/edite/:id' element={<Edite/>}></Route>
    </Routes>
  )
}

export default MainRoute