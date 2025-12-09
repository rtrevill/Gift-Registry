import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home.jsx';
import { Landing } from './pages/Landing.jsx'
import { ErrorPage } from './pages/errorpage.jsx';
import { ActiveReg } from './pages/activeregistries.jsx';
import { SingleRegistry } from './pages/singleregistry.jsx';
import { CreateNewReg } from './pages/createnewreg.jsx';
import { ReviewInvites } from './pages/reviewinvites.jsx';
import { PleaseLogin } from './pages/pleaselogin.jsx';



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
      },
      {
        path: 'active',
        element: <ActiveReg />
      },
      { 
        path: 'singlecard/:regId',
        element: <SingleRegistry />
      },
      {
        path: 'new',
        element: <CreateNewReg />
      },
      {
        path: 'review',
        element: <ReviewInvites />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
