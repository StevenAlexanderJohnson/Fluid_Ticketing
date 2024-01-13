import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import { useSelector } from 'react-redux';
import LandingPage from './pages/Landing';
import Login from './pages/Login';

function App() {
  const authenticated = useSelector((state: any) => state.auth.isLoggedIn);

  const router = createBrowserRouter([
    (authenticated ? {
      path: '/',
      element: <Home />,
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
      ]
    } : {
      path: '/',
      element: <LandingPage />,
      errorElement: <Navigate to="/" replace />,
    }),
    {
      path: '/login',
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
