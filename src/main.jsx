import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { HelmetProvider } from 'react-helmet-async';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Firebase/AuthProvider';
import { Router } from './Routes/Router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={Router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
