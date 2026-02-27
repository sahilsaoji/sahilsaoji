import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Handle redirect from 404.html for GitHub Pages SPA routing
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  // Prepend base URL to the relative path
  const fullPath = import.meta.env.BASE_URL + redirectPath.replace(/^\//, '');
  window.history.replaceState(null, '', fullPath);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
