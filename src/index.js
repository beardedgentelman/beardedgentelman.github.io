import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProSidebarProvider } from 'react-pro-sidebar'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </BrowserRouter>
)
