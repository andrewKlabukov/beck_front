import React from 'react'
import {Redirect, Route} from "react-router-dom"

export default function ProtectedRoute ({ isLogged, children, ...props }) {
  return (
    <Route {...props}>
      {isLogged ? children : <Redirect to = '/sign-in'/>}
    </Route>
  )
}
