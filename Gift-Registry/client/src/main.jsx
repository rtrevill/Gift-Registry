import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home.jsx';
import { Landing } from './pages/Landing.jsx'
import { ErrorPage } from './pages/errorpage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: < Landing />
      },
      {
        path: 'home',
        element: <Home />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
