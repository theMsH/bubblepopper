import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { GamePage } from './pages/GamePage'
import GameProvider from './components/GameProvider'
import NotFoundPage from './pages/NotFoundPage'

// If user navigates any other endpoint than defined in router, it will land in 404 error page
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/play",
    element: <GamePage/>
  }
])

// Strictmode casuses two renders, so score will be dublicated
// GameProvider is created here and router, which handles all the pages that will be rendered inside it.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider score={0} nickname={""}>
        <RouterProvider router={router}></RouterProvider>
    </GameProvider>
  </StrictMode>
)
