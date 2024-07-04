import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Resume from './Components/Resume'
import Portfolio from './Components/Portfolio'
import Service from './Components/Service'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './Components/Contact'

const router=createBrowserRouter([
  {
      path:'/',
      element: <Home/>,
      errorElement: <div>Error! Page Not</div>
  },
  {
      path:'/about',
      element: <About/>
  },
  {
      path:'/resume',
      element: <Resume/>
  },
  {
      path:'/portfolio',
      element: <Portfolio/>
  },
  {
      path:'/service',
      element: <Service/>
  },
  {
      path:'/contact',
      element: <Contact/>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  )
}

export default App
