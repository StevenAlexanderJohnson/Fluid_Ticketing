import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import { useSelector } from 'react-redux';
import LandingPage from './pages/Landing';

function App() {
  const authenticated = useSelector((state: any) => state.auth.isLoggedIn);

  const router = createBrowserRouter([
    {
      path: '/',
      element: authenticated ? <Home /> : <LandingPage />,
      errorElement: <div>404</div>,
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'tickets',
          element: <Tickets />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'tickets',
          element: <Tickets />
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />
}

export default App
