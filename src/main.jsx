import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.js'
import './Translation/i18n.jsx'
import { HelmetProvider } from 'react-helmet-async'; 
import 'react-chatbot-kit/build/main.css';
import './index.css'
import './css/font-awesome.min.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>

    <AppRouter />
    </QueryClientProvider>
    </HelmetProvider>
    

  </StrictMode>,
)
