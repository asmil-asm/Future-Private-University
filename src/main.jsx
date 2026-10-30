import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient.js'
import { HelmetProvider } from 'react-helmet-async'; 
import './index.css'
import './Translation/i18n.jsx'
createRoot(document.getElementById('root')).render(
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>

    <AppRouter />
    </QueryClientProvider>
    </HelmetProvider>
    

)
