import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>404</div>,
      children: [
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
