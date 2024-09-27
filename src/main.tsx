import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { GamePage } from './pages/GamePage'
import GameProvider from './components/GameProvider'
import NotFoundPage from './pages/NotFoundPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/game",
    element: <GamePage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider score={0} nickname={""}>
        <RouterProvider router={router}></RouterProvider>
    </GameProvider>
  </StrictMode>
)
