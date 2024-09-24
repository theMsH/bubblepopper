import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GameManager from './components/GameManager.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/game",
    element: <GameManager></GameManager>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
